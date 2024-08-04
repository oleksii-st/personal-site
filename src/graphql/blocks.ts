import { MEDIA_FIELDS } from '@/graphql/media';
import { LAYOUT } from '@/graphql/layout';

export const HERO = `
    ...on Hero {
        blockType
        image ${MEDIA_FIELDS}
        heading
        subheading
        ${LAYOUT}
    }
`;

const reusableContent = `
    {
        layout {
            ${HERO}
        }
    }
`;

export const REUSABLE_CONTENT_BLOCK = `
    ...on ReusableContentBlock {
        blockType
        reusableContent ${reusableContent}
    }
`;

export const REUSABLE_CONTENT_CONFIG = `
layout {
       ${HERO}
     }`;
