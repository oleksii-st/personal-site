import { fetchPages, fetchRedirects } from '@/graphql';
import { IS_PRODUCTION } from '@/utils/constants';

export default async function sitemap() {
  if (!IS_PRODUCTION) {
    return [];
  }

  const next = { revalidate: 1440 };
  const baseUrl = process.env.SITEMAP_URL as string;
  const pages = await fetchPages(next);
  const redirects = await fetchRedirects(next);

  const pagesMap = pages
    .map((page) => {
      let url = page.breadcrumbs?.[page.breadcrumbs?.length - 1]?.url;

      if (redirects.some((redirect) => redirect.from === url) || page.disableIndex) {
        return null;
      }

      if (url === '/home') {
        url = '';
      }

      url = baseUrl + url + '/';

      return {
        url,
        lastModified: page.updatedAt,
      };
    })
    .filter(Boolean);

  return pagesMap;
}
