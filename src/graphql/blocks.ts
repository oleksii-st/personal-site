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

export const RICH_TEXT = `
    ...on Richtext {
        blockType
        content
        ${LAYOUT}
    }
`;

const reusableContent = `
    {
        layout {
            ${HERO}
            ${RICH_TEXT}
        }
    }
`;

export const REUSABLE_CONTENT_BLOCK = `
    ...on ReusableContentBlock {
        blockType
        reusableContent ${reusableContent}
    }
`;
