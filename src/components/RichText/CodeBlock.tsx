'use client';

import { CopyBlock } from 'react-code-blocks';

import { CODE_STYLES_BLOCK } from '@/utils/constants';

export const CodeBlock = ({
  language,
  items,
}: {
  language: string;
  items: { type: string; text: string }[];
}) => {
  let advancedLanguage = language;

  if (advancedLanguage === 'typescript') {
    advancedLanguage = 'tsx';
  }

  if (advancedLanguage === 'javascript') {
    advancedLanguage = 'jsx';
  }

  const text = items.map((item) => (item.type === 'linebreak' ? '\n' : item.text)).join('') ?? '';

  return (
    <div className="code-block not-prose text-white my-8 overflow-auto bg-[--code-background-color] border-2 rounded-2xl py-2">
      <CopyBlock
        text={text}
        language={advancedLanguage}
        showLineNumbers
        theme={CODE_STYLES_BLOCK}
      />
    </div>
  );
};
