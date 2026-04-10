// POST /api/contact — Creates a Square customer record with the message as a note

import { SquareClient, SquareEnvironment } from 'square';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(200),
  message: z.string().min(1).max(2000),
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

  const { name, email, message } = parsed.data;

  const client = new SquareClient({
    token: env.SQUARE_ACCESS_TOKEN,
    environment:
      env.SQUARE_ENVIRONMENT === 'production'
        ? SquareEnvironment.Production
        : SquareEnvironment.Sandbox,
  });

  try {
    // Search for existing customer by email
    const searchResult = await client.customers.search({
      query: {
        filter: {
          emailAddress: { exact: email },
        },
      },
    });

    if (searchResult.customers && searchResult.customers.length > 0) {
      // Customer exists — append the message as a note update
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
    } else {
      // Create new customer
      const [givenName, ...familyParts] = name.split(' ');
      const familyName = familyParts.join(' ') || undefined;

      const createResult = await client.customers.create({
        givenName,
        familyName,
        emailAddress: email,
        referenceId: 'website-contact-form',
        note: `[Website Contact Form]\n${message}`,
      });

      return Response.json({ success: true, customerId: createResult.customer?.id });
    }
  } catch (error: unknown) {
    console.error('Square API error:', error);
    return Response.json(
      { error: 'Failed to submit contact form. Please try again.' },
      { status: 500 },
    );
  }
};
