import React from 'react';

import { Media } from '@/components';
import { CMSLink } from '@/components/CMSLink';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Optimization as OptimizationType } from '@/payload-types';
import { cn } from '@/utils/cn';
import { Block } from '@/utils/types';

export type OptimizationProps = Block<OptimizationType>;

export const Optimization = ({
  image,
  imageDesktop,
  heading,
  subheading,
  link,
  description,
  paddingTop,
  paddingBottom,
  breakpoints,
  isFirst,
}: OptimizationProps) => {
  const loading = isFirst ? 'eager' : 'lazy';

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} breakpoints={breakpoints}>
      <div className="container">
        {heading && <SectionHeading isFirst={isFirst}>{heading}</SectionHeading>}

        {subheading && (
          <p className={cn('mx-auto text-lg', 'sm:text-xl')}>
            {subheading}
            {link?.label && <CMSLink className="text-link" {...link} />}
          </p>
        )}

        {image && (
          <Media
            className="w-full max-w-[500px] border-2 rounded-2xl mx-auto my-0 sm:hidden"
            sizes="(min-width: 532px) 500px, calc(100vw - 32px)"
            source={image}
            width={500}
            height={334}
            loading={loading}
          />
        )}

        {imageDesktop && (
          <Media
            className="w-full max-w-[600px] border-2 rounded-2xl mx-auto hidden sm:block"
            source={imageDesktop}
            width={600}
            height={480}
            loading={loading}
          />
        )}

        {description && <p className={cn('mx-auto text-lg', 'sm:text-xl')}>{description}</p>}
      </div>
    </Section>
  );
};
