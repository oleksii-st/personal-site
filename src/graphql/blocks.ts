import { LAYOUT } from '@/graphql/layout';
import { LINK_FIELDS } from '@/graphql/link';
import { MEDIA_FIELDS } from '@/graphql/media';

export const HERO = `
    ...on Hero {
        blockType
        image ${MEDIA_FIELDS}
        heading
        subheading
        ${LAYOUT}
    }
`;

export const FEATURES = `
    ...on Features {
        blockType
        heading
        features {
            icon ${MEDIA_FIELDS}
        }
        ${LAYOUT}
    }
`;

export const RICH_TEXT = `
    ...on Richtext {
        blockType
        content
        ${LAYOUT}
    }
`;

export const OPTIMIZATION = `
    ...on Optimization {
        blockType
        heading
        subheading
        link ${LINK_FIELDS}
        image ${MEDIA_FIELDS}
        imageDesktop ${MEDIA_FIELDS}
        description
        ${LAYOUT}
    }
`;

const reusableContent = `
    {
        layout {
            ${HERO}
            ${RICH_TEXT}
            ${FEATURES}
            ${OPTIMIZATION}
        }
    }
`;

export const REUSABLE_CONTENT_BLOCK = `
    ...on ReusableContentBlock {
        blockType
        reusableContent ${reusableContent}
    }
`;
