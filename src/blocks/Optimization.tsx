import React from 'react';

import { Media } from '@/components';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Optimization as OptimizationType } from '@/payload-types';
import { Block } from '@/utils/types';

export type OptimizationProps = Block<OptimizationType>;

export const Optimization = ({
  image,
  heading,
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
            className="w-full max-w-[600px] border-2 rounded-2xl mx-auto my-0"
            sizes="(min-width: 768px) min(calc(50vw - 64px), 692px), (min-width: 992px) min(calc(50vw - 72px), 692px), calc(100vw - 32px)"
            source={image}
            width={692}
            height={692}
            loading={loading}
          />
        )}

        {description && <p className="text-center text-xl">{description}</p>}
      </div>
    </Section>
  );
};
