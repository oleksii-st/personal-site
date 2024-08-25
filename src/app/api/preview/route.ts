import { NextRequest, NextResponse } from 'next/server';

import { TOO_MANY_REQUEST_MESSAGE } from '@/utils/constants';
import { checkRateLimit } from '@/utils/rateLimitUtils';

const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW_MS = 60 * 10 * 1000;

export const POST = async (request: NextRequest) => {
  const { url } = await request.json();
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL as string;

  try {
    const response = await handleRequest(url, cmsUrl);
    const result = await response.json();

    const ip = request.ip;

    if (ip && !checkRateLimit('previewRoute', ip, RATE_LIMIT, RATE_LIMIT_WINDOW_MS)) {
      return Response.json({ message: TOO_MANY_REQUEST_MESSAGE }, { status: 429 });
    }

    if ('errors' in result) {
      return NextResponse.json({ message: result.errors[0].message }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
};

async function handleRequest(url: string, cmsUrl: string) {
  const urlObject = new URL(cmsUrl + '/api/' + url);
  const token = urlObject.searchParams.get('token');
  urlObject.searchParams.delete('token');

  return fetch(String(urlObject), {
    headers: {
      Cookie: `payload-token=${token};`,
    },
  });
}
