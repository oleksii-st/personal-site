import {fetchPage, fetchPages} from "@/graphql";
import {notFound} from "next/navigation";
import {Metadata} from "next";
import {mergeOpenGraph} from "@/utils/mergeOpenGraph";
import {robotsNoIndex} from "@/utils/robotsNoIndex";
import {RenderBlocks} from "@/components/RenderBlocks";


type PageProps = {
    params: { slug: string[] }
}

const Page = async ({ params: { slug = ['home'] } }: PageProps) => {
    const page = await fetchPage(slug)

    if (!page) {
        return notFound()
    }

    return (
        <>
            <RenderBlocks blocks={page.layout}/>
        </>
    )
}

export default Page

export async function generateStaticParams() {
    const pages = await fetchPages()

    return pages.map(({ breadcrumbs }) => ({
        slug: breadcrumbs?.[breadcrumbs.length - 1]?.url?.replace(/^\/|\/$/g, '').split('/'),
    }))
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
    const baseUrl = process.env.SITEMAP_URL ?? "";
    const page = await fetchPage(slug)
    let robots = {}

    if (page?.disableIndex) {
        robots = robotsNoIndex
    }

    let url = page?.breadcrumbs?.[page.breadcrumbs?.length - 1]?.url
    if (url === '/home') {
        url = ''
    }
    url = baseUrl + url + '/'

    const ogImage =
        typeof page?.meta?.image === 'object' &&
        page?.meta?.image !== null &&
        'url' in page?.meta?.image &&
        `${process.env.NEXT_PUBLIC_CMS_URL}${page.meta.image.url}`

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
    }
}
