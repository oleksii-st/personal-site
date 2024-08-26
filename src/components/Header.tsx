import Link from 'next/link';
import React, { ComponentProps } from 'react';

import { SelectTheme } from '@/components/ui/SelectTheme';
import { SkipToMain } from '@/components/ui/SkipToMain';
import { Header as HeaderType } from '@/payload-types';
import { cn } from '@/utils/cn';

type HeaderProps = ComponentProps<'header'> & HeaderType;

export const Header = ({ logo, showThemeSelect, className, ...rest }: HeaderProps) => {
  return (
    <header className={cn('shadow-3xl sm:shadow-none', className)} {...rest}>
      {showThemeSelect && <SkipToMain />}
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {logo && (
            <Link
              href="/"
              className={cn(
                'font-bold text-2xl opacity-100 transition duration-300 text-[var(--headings-color)]',
                'hover:opacity-70',
              )}
            >
              {logo}
            </Link>
          )}

          {showThemeSelect && <SelectTheme />}
        </div>
      </div>
    </header>
  );
};
