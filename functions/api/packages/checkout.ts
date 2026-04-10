// POST /api/packages/checkout — Creates a Square Payment Link for a package purchase

import { SquareClient, SquareEnvironment } from 'square';
import { z } from 'zod';

const CheckoutSchema = z.object({
  packageId: z.string().min(1),
  title: z.string().min(1).max(200),
  priceCents: z.number().int().min(100),
});

interface Env {
  SQUARE_ACCESS_TOKEN: string;
  SQUARE_ENVIRONMENT: string;
  SQUARE_LOCATION_ID: string;
  FRONTEND_URL?: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env } = context;

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = CheckoutSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { packageId, title, priceCents } = parsed.data;

  const client = new SquareClient({
    token: env.SQUARE_ACCESS_TOKEN,
    environment:
      env.SQUARE_ENVIRONMENT === 'production'
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });

  try {
    const redirectBase = env.FRONTEND_URL || context.request.headers.get('Origin') || '';

    const result = await client.checkout.paymentLinks.create({
      idempotencyKey: crypto.randomUUID(),
      quickPay: {
        name: title,
        priceMoney: {
          amount: BigInt(priceCents),
          currency: 'USD',
        },
        locationId: env.SQUARE_LOCATION_ID,
      },
      checkoutOptions: {
        redirectUrl: redirectBase ? `${redirectBase}?package_purchased=${packageId}` : undefined,
      },
    });

    return Response.json({
      url: result.paymentLink?.url,
      orderId: result.paymentLink?.orderId,
    });
  } catch (error: unknown) {
    console.error('Checkout link creation error:', error);
    return Response.json(
      { error: 'Failed to create checkout link.' },
      { status: 500 },
    );
  }
};
