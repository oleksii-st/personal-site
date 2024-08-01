/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    media: Media;
    pages: Page;
    'reusable-content': ReusableContent;
    redirects: Redirect;
    users: User;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    header: Header;
    footer: Footer;
    notFound: NotFound;
    settings: Settings;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  title: string;
  publishedAt?: string | null;
  layout: (
    | {
        image: string | Media;
        heading: string;
        subheading?: string | null;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'hero';
      }
    | {
        heading?: string | null;
        features?:
          | {
              icon: string | Media;
              id?: string | null;
            }[]
          | null;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'features';
      }
    | {
        heading?: string | null;
        image: string | Media;
        description?: string | null;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'optimization';
      }
    | {
        heading?: string | null;
        socials?:
          | {
              link?: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
              };
              icon: string | Media;
              id?: string | null;
            }[]
          | null;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'socials';
      }
    | {
        heading?: string | null;
        nameLabel: string;
        emailLabel: string;
        topicLabel: string;
        messageLabel: string;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'contact';
      }
    | {
        heading?: string | null;
        jobs?:
          | {
              link: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
                label: string;
              };
              icon: string | Media;
              id?: string | null;
            }[]
          | null;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'experience';
      }
    | {
        heading?: string | null;
        content: {
          [k: string]: unknown;
        }[];
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'richText';
      }
  )[];
  disableIndex?: boolean | null;
  slug?: string | null;
  meta?: {
    title?: string | null;
    description?: string | null;
    image?: string | Media | null;
  };
  parent?: (string | null) | Page;
  breadcrumbs?:
    | {
        doc?: (string | null) | Page;
        url?: string | null;
        label?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt: string;
  createdAt: string;
  _status?: ('draft' | 'published') | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "reusable-content".
 */
export interface ReusableContent {
  id: string;
  title: string;
  layout: (
    | {
        image: string | Media;
        heading: string;
        subheading?: string | null;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'hero';
      }
    | {
        heading?: string | null;
        features?:
          | {
              icon: string | Media;
              id?: string | null;
            }[]
          | null;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'features';
      }
    | {
        heading?: string | null;
        image: string | Media;
        description?: string | null;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'optimization';
      }
    | {
        heading?: string | null;
        socials?:
          | {
              link?: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
              };
              icon: string | Media;
              id?: string | null;
            }[]
          | null;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'socials';
      }
    | {
        heading?: string | null;
        nameLabel: string;
        emailLabel: string;
        topicLabel: string;
        messageLabel: string;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'contact';
      }
    | {
        heading?: string | null;
        jobs?:
          | {
              link: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
                label: string;
              };
              icon: string | Media;
              id?: string | null;
            }[]
          | null;
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'experience';
      }
    | {
        heading?: string | null;
        content: {
          [k: string]: unknown;
        }[];
        hideBlock?: boolean | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        breakpoints?:
          | {
              breakpoint?: number | null;
              paddingTop?: number | null;
              paddingBottom?: number | null;
              id?: string | null;
            }[]
          | null;
        id?: string | null;
        blockName?: string | null;
        blockType: 'richText';
      }
  )[];
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "redirects".
 */
export interface Redirect {
  id: string;
  from: string;
  to: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  name?: string | null;
  roles?: ('admin' | 'user')[] | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  logo: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  columns?:
    | {
        navItems?:
          | {
              link: {
                type?: ('reference' | 'custom') | null;
                newTab?: boolean | null;
                reference?: {
                  relationTo: 'pages';
                  value: string | Page;
                } | null;
                url?: string | null;
                label: string;
              };
              id?: string | null;
            }[]
          | null;
        id?: string | null;
      }[]
    | null;
  copyright?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "notFound".
 */
export interface NotFound {
  id: string;
  heading?: string | null;
  description?:
    | {
        [k: string]: unknown;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "settings".
 */
export interface Settings {
  id: string;
  container: number;
  horizontalPaddings: number;
  backgroundColor: string;
  textColor: string;
  headingsColor: string;
  updatedAt?: string | null;
  createdAt?: string | null;
}
