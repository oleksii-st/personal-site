import { NextRequest } from 'next/server';
import { Resend } from 'resend';

import { EmailContactTemplate } from '@/components/EmailContactTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);
const authorEmail = process.env.EMAIL as string;

const serverError = `Temporary server error. Please try again letter or write directly to ${authorEmail}`;

export async function POST(request: NextRequest) {
  try {
    const { email, subject, name, message } = await request.json();

    const emptyFields = Object.entries({ email, subject, name, message })
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
      subject,
      react: EmailContactTemplate({ name, email, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.log('error: ', error);
    return Response.json({ message: serverError }, { status: 500 });
  }
}
