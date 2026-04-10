// POST /api/booking/availability — Search available time slots for a service

import { SquareClient, SquareEnvironment } from 'square';
import { z } from 'zod';

const AvailabilitySchema = z.object({
  serviceVariationId: z.string().min(1),
  startDate: z.string().min(1), // ISO 8601 date, e.g. "2026-04-15"
  endDate: z.string().min(1),   // ISO 8601 date, e.g. "2026-04-16"
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

  const parsed = AvailabilitySchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { serviceVariationId, startDate, endDate } = parsed.data;

  const client = new SquareClient({
    token: env.SQUARE_ACCESS_TOKEN,
    environment:
      env.SQUARE_ENVIRONMENT === 'production'
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });

  try {
    const result = await client.bookings.searchAvailability({
      query: {
        filter: {
          startAtRange: {
            startAt: `${startDate}T00:00:00Z`,
            endAt: `${endDate}T23:59:59Z`,
          },
          locationId: env.SQUARE_LOCATION_ID,
          segmentFilters: [
            {
              serviceVariationId,
            },
          ],
        },
      },
    });

    // Map availability to a simpler format
    const slots = (result.availabilities || []).map((a) => ({
      startAt: a.startAt,
      locationId: a.locationId,
      segments: (a.appointmentSegments || []).map((seg) => ({
        teamMemberId: seg.teamMemberId,
        durationMinutes: seg.durationMinutes,
        serviceVariationId: seg.serviceVariationId,
        serviceVariationVersion: seg.serviceVariationVersion?.toString(),
      })),
    }));

    return Response.json({ slots });
  } catch (error: unknown) {
    console.error('Availability search error:', error);
    return Response.json(
      { error: 'Failed to search availability.' },
      { status: 500 },
    );
  }
};
