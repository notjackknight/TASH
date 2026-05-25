/**
 * One-shot script: pull the renamed services + packages from the Square Catalog
 * API and write them to scripts/.square_catalog.json (gitignored).
 *
 * Run from project root:
 *   npx tsx scripts/sync_from_square.ts
 *
 * Reads SQUARE_ACCESS_TOKEN + SQUARE_ENVIRONMENT from .env (loaded inline; no
 * dotenv dependency). Lists every ITEM-type catalog object, extracts id, name,
 * description, and the first variation's price, writes JSON, and prints a
 * human-readable table for the manual rename pass.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SquareClient, SquareEnvironment } from 'square';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

function loadDotenv(path: string): Record<string, string> {
  const out: Record<string, string> = {};
  let raw: string;
  try {
    raw = readFileSync(path, 'utf8');
  } catch {
    return out;
  }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    out[key] = value;
  }
  return out;
}

const env = { ...loadDotenv(join(ROOT, '.env')), ...process.env };

const token = env.SQUARE_ACCESS_TOKEN;
const environment = (env.SQUARE_ENVIRONMENT || 'production').toLowerCase();
if (!token) {
  console.error('Missing SQUARE_ACCESS_TOKEN in .env');
  process.exit(1);
}

const client = new SquareClient({
  token,
  environment: environment === 'sandbox' ? SquareEnvironment.Sandbox : SquareEnvironment.Production,
});

type CatalogItem = {
  id: string;
  name: string;
  description: string;
  priceCents: number | null;
  priceFormatted: string;
};

function formatPrice(cents: number | null): string {
  if (cents == null) return '—';
  const dollars = cents / 100;
  return cents % 100 === 0 ? `$${dollars.toFixed(0)}` : `$${dollars.toFixed(2)}`;
}

async function main() {
  const items: CatalogItem[] = [];
  // SDK v44: client.catalog.list returns a Page that is async-iterable.
  const page = await client.catalog.list({ types: 'ITEM' });
  for await (const obj of page) {
    if (obj.type !== 'ITEM' || !obj.itemData) continue;
    const data = obj.itemData;
    const variation = data.variations?.[0];
    let priceCents: number | null = null;
    if (variation && variation.type === 'ITEM_VARIATION' && variation.itemVariationData) {
      const amount = variation.itemVariationData.priceMoney?.amount;
      if (amount != null) {
        priceCents = typeof amount === 'bigint' ? Number(amount) : Number(amount);
      }
    }
    items.push({
      id: obj.id,
      name: data.name ?? '',
      description: data.description ?? '',
      priceCents,
      priceFormatted: formatPrice(priceCents),
    });
  }

  items.sort((a, b) => a.name.localeCompare(b.name));

  const outPath = join(ROOT, 'scripts', '.square_catalog.json');
  writeFileSync(outPath, JSON.stringify(items, null, 2) + '\n', 'utf8');

  console.log(`\nPulled ${items.length} ITEM objects from Square (${environment}).`);
  console.log(`Wrote ${outPath}\n`);

  const nameWidth = Math.min(60, Math.max(...items.map((i) => i.name.length), 4));
  const idWidth = 26;
  const header = `${'Name'.padEnd(nameWidth)}  ${'Square ID'.padEnd(idWidth)}  Price`;
  console.log(header);
  console.log('-'.repeat(header.length));
  for (const item of items) {
    const name = item.name.length > nameWidth ? item.name.slice(0, nameWidth - 1) + '…' : item.name.padEnd(nameWidth);
    console.log(`${name}  ${item.id.padEnd(idWidth)}  ${item.priceFormatted}`);
  }
}

main().catch((err) => {
  console.error('sync_from_square failed:', err);
  process.exit(1);
});
