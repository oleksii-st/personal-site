import { LINK_FIELDS } from '@/graphql/link';

export const GLOBALS = `
  query {
    Header {
      logo
      showThemeSelect
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
        backgroundColorLight
        textColorLight
        headingsColorLight
        backgroundColorDark
        textColorDark
        headingsColorDark
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
