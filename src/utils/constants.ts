export const BASE_URL = process.env.SITEMAP_URL as string;
export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const TOO_MANY_REQUEST_MESSAGE = 'Too many requests! Try again later.';
