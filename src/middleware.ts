import { NextResponse } from 'next/server';
import { fetchRedirects } from '@/graphql';

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  const redirects = await fetchRedirects();
  const currentRedirect = redirects.find((redirect) => redirect.from === pathname);

  if (currentRedirect) {
    return NextResponse.redirect(new URL(currentRedirect.to, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|blog|ingest).*)'],
};
