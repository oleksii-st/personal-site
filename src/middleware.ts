import { NextResponse } from 'next/server';

import { fetchRedirects } from '@/graphql';

export async function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    const redirects = await fetchRedirects();
    const currentRedirect = redirects.find(
      (redirect) => redirect.from === pathname || redirect.from === request.url,
    );

    if (currentRedirect) {
      if (currentRedirect.to?.type === 'reference') {
        const value = currentRedirect.to.reference?.value;

        if (typeof value === 'string') {
          return NextResponse.redirect(new URL(value as string, request.url));
        }

        if (value && 'breadcrumbs' in value) {
          return NextResponse.redirect(
            new URL(String(value.breadcrumbs?.at(-1)?.url), request.url),
          );
        }
      } else {
        return NextResponse.redirect(new URL(currentRedirect.to?.url as string, request.url));
      }
    }
  } catch (e: unknown) {
    console.log(e);
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|blog|ingest).*)'],
};
