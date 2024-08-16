import React from 'react';

import { Media } from '@/components';
import { Section } from '@/components/Section';
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
        {heading && <h2>{heading}</h2>}

        {image && (
          <Media
            className="w-full max-w-[600px] border-2 rounded-2xl mx-auto my-0"
            sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 991px) min(calc(50vw - 48px), 692px), min(calc(50vw - 60px), 692px)"
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
