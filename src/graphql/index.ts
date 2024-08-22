import { GLOBALS, NOT_FOUND } from '@/graphql/globals';
import { PAGE, PAGES } from '@/graphql/pages';
import { REDIRECTS } from '@/graphql/redirects';
import { Footer, Header, NotFound, Page, Redirect, Settings } from '@/payload-types';
import { IS_DEVELOPMENT } from '@/utils/constants';

const defaultNext = {
  revalidate: IS_DEVELOPMENT ? 0 : 600,
};

export const fetchGlobals = async (next?: {
  revalidate: number;
}): Promise<{
  footer: Footer;
  header: Header;
  settings: Settings;
}> => {
  next = next || defaultNext;
  const { data } = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?globals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next,
    body: JSON.stringify({
      query: GLOBALS,
    }),
  }).then((res) => res.json());

  return {
    footer: data.Footer,
    header: data.Header,
    settings: data.Settings,
  };
};

export const fetchNotFound = async (next?: { revalidate: number }): Promise<NotFound> => {
  next = next || defaultNext;
  const { data } = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?globals`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next,
    body: JSON.stringify({
      query: NOT_FOUND,
    }),
  }).then((res) => res.json());

  return data.NotFound;
};

export const fetchPage = async (
  incomingSlugSegments?: string[],
  next?: { revalidate: number },
): Promise<Page | null> => {
  next = next || defaultNext;
  const slugSegments = incomingSlugSegments || ['home'];
  const slug = slugSegments.at(-1);
  const { data, errors } = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?page=${slug}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next,
      body: JSON.stringify({
        query: PAGE,
        variables: {
          slug,
        },
      }),
    },
  ).then((res) => res.json());

  if (errors) {
    console.error(JSON.stringify(errors));
    throw new Error();
  }

  const pagePath = `/${slugSegments.join('/')}`;

  const page = data.Pages?.docs.find(({ breadcrumbs }: Page) => {
    if (!breadcrumbs) return false;
    const { url } = breadcrumbs[breadcrumbs.length - 1];
    return url === pagePath;
  });

  if (page) {
    return page;
  }

  return null;
};

export const fetchPages = async (next?: {
  revalidate: number;
}): Promise<
  Array<{
    breadcrumbs: Page['breadcrumbs'];
    slug: string;
    updatedAt: string;
    disableIndex?: boolean;
  }>
> => {
  next = next || defaultNext;

  let result: {
    breadcrumbs: Page['breadcrumbs'];
    slug: string;
    updatedAt: string;
    indexable?: boolean;
  }[] = [];

  const getPagesOnPage = async (page: number) => {
    const { data, errors } = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next,
      body: JSON.stringify({
        query: PAGES(page),
      }),
    }).then((res) => res.json());

    if (errors) {
      console.error(JSON.stringify(errors));
      throw new Error();
    }

    return data.Pages;
  };

  let allFetched = false;
  let page = 1;

  while (!allFetched) {
    const data = await getPagesOnPage(page);

    result = [...result, ...data.docs];

    page++;

    if (!data?.hasNextPage) {
      allFetched = true;
    }
  }

  return result;
};

export const fetchRedirects = async (next?: { revalidate: number }): Promise<Redirect[]> => {
  next = next || defaultNext;
  const { data } = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/graphql?redirects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    next,
    body: JSON.stringify({
      query: REDIRECTS,
    }),
  }).then((res) => res.json());

  return data?.Redirects?.docs || [];
};

export const fetchPreview = async (
  url: string,
  next?: { revalidate: number },
): Promise<Page | { message: string } | null> => {
  next = next || defaultNext;
  try {
    const data = await fetch(`/api/preview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      next,
      body: JSON.stringify({
        url: url,
      }),
    }).then((res) => res.json());

    if (data.errors) {
      console.error(JSON.stringify(data.errors));
      throw new Error();
    }

    return data;
  } catch (e: unknown) {
    console.log('e: ', e);
    return null;
  }
};
