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
            description
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

export const SOCIALS = `
    ...on Socials {
        blockType
        heading
        socials {
            link ${LINK_FIELDS}
            icon ${MEDIA_FIELDS}
        }
        ${LAYOUT}
    }
`;

export const CONTACT = `
    ...on Contact {
        blockType
        heading
        nameLabel
        emailLabel
        topicLabel
        messageLabel
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
            ${SOCIALS}
            ${CONTACT}
        }
    }
`;

export const REUSABLE_CONTENT_BLOCK = `
    ...on ReusableContentBlock {
        blockType
        reusableContent ${reusableContent}
    }
`;
