// POST /api/booking/create — Create customer (or find existing), store card, create booking

import { SquareClient, SquareEnvironment } from 'square';
import { z } from 'zod';

const CreateBookingSchema = z.object({
  serviceVariationId: z.string().min(1),
  serviceVariationVersion: z.string().min(1), // BigInt as string
  teamMemberId: z.string().min(1),
  startAt: z.string().min(1), // ISO 8601 datetime
  durationMinutes: z.number().int().positive(),
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  phone: z.string().min(1).max(30),
  note: z.string().max(1000).optional(),
  cardToken: z.string().min(1), // Payment token from Web Payments SDK
});

interface Env {
  SQUARE_ACCESS_TOKEN: string;
  SQUARE_ENVIRONMENT: string;
  SQUARE_LOCATION_ID: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env } = context;

  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = CreateBookingSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const {
    serviceVariationId,
    serviceVariationVersion,
    teamMemberId,
    startAt,
    durationMinutes,
    name,
    email,
    phone,
    note,
    cardToken,
  } = parsed.data;

  const client = new SquareClient({
    token: env.SQUARE_ACCESS_TOKEN,
    environment:
      env.SQUARE_ENVIRONMENT === 'production'
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });

  const idempotencyKey = crypto.randomUUID();

  try {
    // Step 1: Find or create customer
    let customerId: string;

    const searchResult = await client.customers.search({
      query: {
        filter: {
          emailAddress: { exact: email },
        },
      },
    });

    if (searchResult.customers && searchResult.customers.length > 0) {
      customerId = searchResult.customers[0].id!;
      // Ensure phone number is on the record (required for bookings)
      if (!searchResult.customers[0].phoneNumber) {
        await client.customers.update({
          customerId,
          phoneNumber: phone,
        });
      }
    } else {
      const [givenName, ...familyParts] = name.split(' ');
      const createResult = await client.customers.create({
        givenName,
        familyName: familyParts.join(' ') || undefined,
        emailAddress: email,
        phoneNumber: phone,
        referenceId: 'website-booking',
      });
      customerId = createResult.customer!.id!;
    }

    // Step 2: Store card on file
    // Square runs a $0 verification charge automatically
    const cardResult = await client.cards.create({
      idempotencyKey: `card-${idempotencyKey}`,
      sourceId: cardToken,
      card: {
        customerId,
      },
    });

    const cardLast4 = cardResult.card?.last4 || undefined;

    // Step 3: Create the booking
    const bookingResult = await client.bookings.create({
      idempotencyKey: `book-${idempotencyKey}`,
      booking: {
        locationId: env.SQUARE_LOCATION_ID,
        customerId,
        startAt,
        customerNote: note || undefined,
        appointmentSegments: [
          {
            serviceVariationId,
            serviceVariationVersion: BigInt(serviceVariationVersion),
            teamMemberId,
            durationMinutes,
          },
        ],
      },
    });

    return Response.json({
      success: true,
      booking: {
        id: bookingResult.booking?.id,
        startAt: bookingResult.booking?.startAt,
        status: bookingResult.booking?.status,
      },
      cardLast4,
    });
  } catch (error: unknown) {
    console.error('Booking creation error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create booking.';
    return Response.json(
      { error: message },
      { status: 500 },
    );
  }
};
