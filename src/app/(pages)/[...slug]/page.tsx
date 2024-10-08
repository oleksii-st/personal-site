import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Blocks } from '@/components/Blocks';
import { fetchPage, fetchPages } from '@/graphql';
import { IS_PRODUCTION } from '@/utils/constants';
import { mergeOpenGraph } from '@/utils/mergeOpenGraph';
import { robotsNoIndex } from '@/utils/robotsNoIndex';

type PageProps = {
  params: { slug: string[] };
};

const Page = async ({ params: { slug = ['home'] } }: PageProps) => {
  const page = await fetchPage(slug);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <Blocks blocks={page.layout} />
    </>
  );
};

export default Page;

export async function generateStaticParams() {
  const pages = await fetchPages();

  return pages.map(({ breadcrumbs }) => ({
    slug: breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '').split('/'),
  }));
}

export async function generateMetadata({ params: { slug } }: PageProps): Promise<Metadata> {
  const baseUrl = process.env.SITEMAP_URL ?? '';
  const page = await fetchPage(slug);
  let robots = {};

  if (page?.disableIndex || !IS_PRODUCTION) {
    robots = robotsNoIndex;
  }

  let url = page?.breadcrumbs?.[page.breadcrumbs?.length - 1]?.url;
  if (url === '/home') {
    url = '';
  }
  url = baseUrl + url + '/';

  const image = page?.meta?.image ?? '';
  let imageUrl = '';

  if (typeof image !== 'string') {
    imageUrl = image.url ?? '';
  }

  const ogImage = `${process.env.NEXT_PUBLIC_CMS_URL}${imageUrl}`;

  return {
    title: page?.meta?.title ?? '',
    description: page?.meta?.description || '',
    alternates: {
      canonical: url,
    },
    openGraph: mergeOpenGraph({
      title: page?.meta?.title ?? '',
      description: page?.meta?.description || '',
      url: Array.isArray(slug) ? slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
    robots,
  };
}
