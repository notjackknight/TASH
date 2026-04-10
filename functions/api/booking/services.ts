// GET /api/booking/services — Fetches bookable appointment services from Square Catalog

import { SquareClient, SquareEnvironment } from 'square';

interface Env {
  SQUARE_ACCESS_TOKEN: string;
  SQUARE_ENVIRONMENT: string;
  SQUARE_LOCATION_ID: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env } = context;

  const client = new SquareClient({
    token: env.SQUARE_ACCESS_TOKEN,
    environment:
      env.SQUARE_ENVIRONMENT === 'production'
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });

  try {
    // Fetch appointment-type catalog items
    const result = await client.catalog.searchItems({
      productTypes: ['APPOINTMENTS_SERVICE'],
      enabledLocationIds: [env.SQUARE_LOCATION_ID],
    });

    const services: Array<{
      name: string;
      variationId: string;
      version: string;
      priceCents: number | null;
      durationMinutes: number | null;
    }> = [];

    for (const item of result.items || []) {
      // Narrow the union type — searchItems returns ITEM-type catalog objects
      if (item.type !== 'ITEM') continue;
      const itemData = item.itemData;
      if (!itemData) continue;

      for (const variation of itemData.variations || []) {
        if (variation.type !== 'ITEM_VARIATION') continue;
        const varData = variation.itemVariationData;
        if (!varData || !variation.id) continue;

        // Duration is stored as milliseconds in the service variation
        const duration = varData.serviceDuration != null
          ? Number(varData.serviceDuration) / 60000 // ms to minutes
          : null;

        // Use the item name. Only append the variation name if it's
        // meaningful (not "Regular", which is Square's default).
        const isDefaultVariation = !varData.name || varData.name === 'Regular' || varData.name === itemData.name;
        services.push({
          name: itemData.name
            ? isDefaultVariation
              ? itemData.name
              : `${itemData.name} — ${varData.name}`
            : varData.name || 'Unnamed Service',
          variationId: variation.id,
          version: variation.version != null ? variation.version.toString() : '0',
          priceCents: varData.priceMoney?.amount != null
            ? Number(varData.priceMoney.amount)
            : null,
          durationMinutes: duration,
        });
      }
    }

    return Response.json({ services }, {
      headers: {
        'Cache-Control': 'public, max-age=900', // 15 min CDN cache
      },
    });
  } catch (error: unknown) {
    console.error('Catalog search error:', error);
    return Response.json(
      { error: 'Failed to fetch services.' },
      { status: 500 },
    );
  }
};
