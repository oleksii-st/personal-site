import Link from 'next/link';
import React, { ComponentProps } from 'react';

import { Header as HeaderType } from '@/payload-types';
import { cn } from '@/utils/cn';

type HeaderProps = ComponentProps<'header'> & HeaderType;

export const Header = ({ logo, className, ...rest }: HeaderProps) => {
  return (
    <header className={cn('shadow-3xl sm:shadow-none', className)} {...rest}>
      <div className="container">
        <div className="flex py-4">
          {logo && (
            <Link
              href="/public"
              className={cn(
                'font-bold text-2xl opacity-100 transition duration-300',
                'hover:opacity-70',
              )}
            >
              {logo}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
