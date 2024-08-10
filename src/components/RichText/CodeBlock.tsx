'use client';

import { CopyBlock, hybrid } from 'react-code-blocks';

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
    <div className="code-block not-prose text-white my-8 overflow-auto bg-[#1d1f21]">
      <CopyBlock text={text} language={advancedLanguage} showLineNumbers theme={hybrid} />
    </div>
  );
};
