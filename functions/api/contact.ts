// POST /api/contact — Creates a Square customer record with the message as a note

import { SquareClient, SquareEnvironment } from 'square';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200).optional(),
  phone: z.string().min(7).max(30).optional(),
  message: z.string().min(1).max(2000),
  smsConsent: z.boolean().optional(),
}).refine((data) => data.email || data.phone, {
  message: 'Either email or phone is required',
});

interface Env {
  SQUARE_ACCESS_TOKEN: string;
  SQUARE_ENVIRONMENT: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env } = context;

  // Parse and validate
  let body: unknown;
  try {
    body = await context.request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: 'Validation failed', details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, phone, message, smsConsent } = parsed.data;

  // Normalize phone to E.164 (US numbers)
  const normalizedPhone = phone
    ? '+1' + phone.replace(/\D/g, '').replace(/^1/, '')
    : undefined;

  const client = new SquareClient({
    token: env.SQUARE_ACCESS_TOKEN,
    environment:
      env.SQUARE_ENVIRONMENT === 'production'
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });

  try {
    // Search for existing customer by email (phone search is unreliable)
    if (email) {
      const searchResult = await client.customers.search({
        query: { filter: { emailAddress: { exact: email } } },
      });

      if (searchResult.customers && searchResult.customers.length > 0) {
        const existing = searchResult.customers[0];
        const customerId = existing.id!;
        const existingNote = existing.note || '';
        const timestamp = new Date().toISOString().split('T')[0];
        const updatedNote = existingNote
          ? `${existingNote}\n\n[Website Contact Form — ${timestamp}]\n${message}`
          : `[Website Contact Form — ${timestamp}]\n${message}`;

        await client.customers.update({
          customerId,
          note: updatedNote,
        });

        return Response.json({ success: true, customerId });
      }
    }

    // Create new customer (or phone-based submission)
    const [givenName, ...familyParts] = name.split(' ');
    const familyName = familyParts.join(' ') || undefined;

    const createResult = await client.customers.create({
      givenName,
      familyName,
      ...(email ? { emailAddress: email } : {}),
      ...(normalizedPhone ? { phoneNumber: normalizedPhone } : {}),
      referenceId: 'website-contact-form',
      note: `[Website Contact Form]${smsConsent ? ' [SMS Consent: Yes]' : ''}\n${message}`,
    });

    return Response.json({ success: true, customerId: createResult.customer?.id });
  } catch (error: unknown) {
    console.error('Square API error:', error);
    // TEMP DIAGNOSTIC: surface the real Square error to the client so we can
    // see why production fails. REVERT this once the root cause is found.
    return Response.json(
      {
        error: 'Failed to submit contact form. Please try again.',
        debug: {
          message: error instanceof Error ? error.message : String(error),
          name: error instanceof Error ? error.name : undefined,
          // Square SDK errors carry statusCode + body with the API detail
          statusCode: (error as { statusCode?: number })?.statusCode,
          body: (error as { body?: unknown })?.body,
          errors: (error as { errors?: unknown })?.errors,
          envSet: {
            hasToken: Boolean(env.SQUARE_ACCESS_TOKEN),
            environment: env.SQUARE_ENVIRONMENT ?? null,
          },
        },
      },
      { status: 500 },
    );
  }
};
