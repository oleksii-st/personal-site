import { NextRequest } from 'next/server';
import { Resend } from 'resend';

import { EmailContactTemplate } from '@/components/EmailContactTemplate';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY as string);
const authorEmail = process.env.EMAIL as string;
const rateLimitMap = new Map();
const limit = 5;
const windowMs = 60 * 5000;

export async function POST(request: NextRequest) {
  const CONTACT_SERVER_ERROR = `Temporary server error. Please try again letter or write directly to ${authorEmail}`;

  const ip = request.ip;

  if (ip) {
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      return Response.json({ message: `Too many request! Try 5 minutes later` }, { status: 429 });
    }

    ipData.count += 1;
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
