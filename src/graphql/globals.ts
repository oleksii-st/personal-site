import { LINK_FIELDS } from '@/graphql/link';

export const GLOBALS = `
  query {
    Header {
      logo
    }
    Footer {
      columns {
        navItems {
            link ${LINK_FIELDS}
        }
      }
      copyright
    }
    Settings {
        container
        horizontalPaddings
        horizontalPaddingsDesktop
        backgroundColor
        textColor
        headingsColor
    }
  }
`;

export const NOT_FOUND = `
    query {
        NotFound {
           heading
           description
        }
    }
`;
