import { NextRequest } from 'next/server';
import { Resend } from 'resend';

import { EmailContactTemplate } from '@/components/EmailContactTemplate';
import { checkRateLimit } from '@/utils/rateLimitUtils';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);
const authorEmail = process.env.EMAIL as string;
const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 5000;

export async function POST(request: NextRequest) {
  const CONTACT_SERVER_ERROR = `Temporary server error. Please try again letter or write directly to ${authorEmail}`;

  const ip = request.ip;

  if (ip && !checkRateLimit('contactRoute', ip, RATE_LIMIT, RATE_LIMIT_WINDOW_MS)) {
    return Response.json({ message: `Too many requests! Try again later.` }, { status: 429 });
  }

  try {
    const { email, topic, name, message } = await request.json();

    const emptyFields = Object.entries({ email, topic, name, message })
      .filter((entry) => !entry[1])
      .map((entry) => entry[0]);

    if (emptyFields.length) {
      return Response.json(
        { message: `These fields are required: ${emptyFields.join(', ')}!` },
        { status: 422 },
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Contact form <okesksii-s@resend.dev>',
      to: [authorEmail],
      subject: topic,
      react: EmailContactTemplate({ name, email, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log('error: ', error);
    return Response.json({ message: CONTACT_SERVER_ERROR }, { status: 500 });
  }
}
