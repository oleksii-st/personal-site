import React from 'react';

import { Media } from '@/components';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { CMSLink } from '@/components/ui/CMSLink';
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

        {image && (
          <Media
            className="w-full max-w-[500px] border-2 rounded-2xl mx-auto mt-0 mb-6 sm:hidden"
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

        {subheading && (
          <p className={cn('mx-auto mb-2 text-lg text-center', 'sm:text-xl')}>
            {subheading}
            {link?.label && <CMSLink className="text-link" {...link} />}
          </p>
        )}

        {description && <p className={cn('mx-auto mb-0 text-base text-center')}>{description}</p>}
      </div>
    </Section>
  );
};
