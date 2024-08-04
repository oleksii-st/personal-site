import React, { HTMLAttributes } from 'react';

import { serializeLexical } from './serialize';
import { cn } from '@/utils/cn';

type RichTextProps = HTMLAttributes<HTMLDivElement> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
};

export const RichText = ({ className, content, ...rest }: RichTextProps) => {
  if (!content) {
    return null;
  }

  return (
    <div className={cn('richText', className)} {...rest}>
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  );
};
