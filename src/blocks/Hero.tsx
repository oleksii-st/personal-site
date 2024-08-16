import React from 'react';

import { Media } from '@/components';
import { Section } from '@/components/Section';
import { Hero as HeroType } from '@/payload-types';
import { cn } from '@/utils/cn';
import { Block } from '@/utils/types';

export type HeroProps = Block<HeroType>;

export const Hero = ({
  image,
  heading,
  subheading,
  paddingTop,
  paddingBottom,
  breakpoints,
  isFirst,
}: HeroProps) => {
  const loading = isFirst ? 'eager' : 'lazy';

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} breakpoints={breakpoints}>
      <div className="container">
        <div
          className={cn(
            'max-w-[500px] mx-auto flex flex-col gap-4',
            'sm:max-w-full sm:flex-row sm:gap-8 sm:items-center',
            'md:gap-14',
          )}
        >
          {image && (
            <div className="sm:w-[calc(50%-16px)]">
              <Media
                className="w-full rounded-full my-0"
                sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 991px) min(calc(50vw - 48px), 692px), min(calc(50vw - 60px), 692px)"
                source={image}
                width={692}
                height={692}
                loading={loading}
              />
            </div>
          )}

          {Boolean(heading || subheading) && (
            <div className={cn('text-center', 'sm:text-left sm:w-[calc(50%-16px)]')}>
              {heading && <h1 className={cn('mb-4', 'sm:md-8 text-left')}>{heading}</h1>}

              {subheading && (
                <p className={cn('m-0 text-xl', 'sm:text-2xl', 'md:text-4xl')}>{subheading}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};
