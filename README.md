# Personal Site

A personal website project built with Next.js, React and Payload CMS. </br>
CMS part of this project can be found [here](https://github.com/oleksii-st/personal-site-cms)

## This repo is archived and will never be updated.

The project was created with Payload 2.0 and currently deprecated.
Payload 3.0 version which combine CMS and website parts can be found [here](https://github.com/oleksii-st/personal-site-monorepo). (Probably private repo).

## Description

This project is a personal website built using Next.js, React, and various modern web technologies. It includes features like rich text editing, theming, and animations.

## Prerequisites

- Node.js
- Yarn (version 4.4.0 or later)

## Installation

1. Clone the repository:
   `git clone <repository-url>`

2. Install dependencies:
   `yarn install`

## Scripts

- `yarn dev`: Start the development server
- `yarn build`: Build the project for production
- `yarn start`: Start the production server
- `yarn lint`: Run ESLint
- `yarn lint:fix`: Run ESLint and fix issues
- `yarn format`: Format code using Prettier

## Development

To start the development server:
`yarn dev`

This will start the Next.js development server.

## Building for Production

To build the project for production:
`yarn build`

## Serving Production Build

To serve the production build:
`yarn start`

## Linting and Formatting

- Run `yarn lint` to check for linting issues
- Run `yarn lint:fix` to automatically fix linting issues
- Run `yarn format` to format code using Prettier

## Git Hooks

This project uses Husky for Git hooks. The pre-commit hook runs lint-staged to ensure all staged files are formatted before committing.

## Key Dependencies

- Next.js
- React
- Tailwind CSS
- Lexical (Rich Text Editing)
- Radix UI
- Formik
- Swiper
- TypeScript

For a full list of dependencies, please refer to the `package.json` file.

## Styling

This project uses Tailwind CSS for styling, along with additional plugins:

- @tailwindcss/typography
- tailwindcss-animate

## Theming

The project includes theme support using the `next-themes` package.

## Code Highlighting

Code highlighting is implemented using the `react-code-blocks` package.

## Email Functionality

Email functionality is provided through the `resend` package.

## Development Tools

- ESLint for linting
- Prettier for code formatting
- TypeScript for type checking
