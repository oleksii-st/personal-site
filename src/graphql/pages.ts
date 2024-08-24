import {
  CONTACT,
  FEATURES,
  HERO,
  OPTIMIZATION,
  REUSABLE_CONTENT_BLOCK,
  RICH_TEXT,
  SOCIALS,
} from '@/graphql/blocks';
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
            ${RICH_TEXT}
            ${FEATURES}
            ${OPTIMIZATION}
            ${SOCIALS}
            ${CONTACT}
            ${REUSABLE_CONTENT_BLOCK}
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
