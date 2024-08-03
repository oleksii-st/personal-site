import {MEDIA_FIELDS} from "@/graphql/media";
import {LAYOUT} from "@/graphql/layout";

export const HERO = `
    ...on Hero {
        blockType
        image ${MEDIA_FIELDS}
        heading
        subheading
        ${LAYOUT}
    }
`;

export const REUSABLE_CONTENT_CONFIG = `
layout {
       ${HERO}
     }`
