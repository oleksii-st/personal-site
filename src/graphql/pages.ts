import { HERO } from '@/graphql/blocks';
import { META_FIELDS } from '@/graphql/meta';

export const PAGES = (page: number) => {
  return `
  query Pages {
    Pages(limit: 300, page: ${page}, where: { slug: { not_equals: "cloud" } }) {
      hasNextPage
      docs {
        slug
        updatedAt
        disableIndex
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`;
};

export const PAGE = `
  query Page($slug: String ) {
    Pages(where: { slug: { equals: $slug} }) {
      docs {
        updatedAt
        id
        title
        layout {
            ${HERO}
        }
        meta ${META_FIELDS}
        breadcrumbs {
          url
          label
        }
        disableIndex
      }
    }
  }
`;
