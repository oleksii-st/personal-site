import { LAYOUT } from '@/graphql/layout';
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
        image ${MEDIA_FIELDS}
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
