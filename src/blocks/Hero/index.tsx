import React from 'react';

import { Section } from '@/components/Section';
import { Hero as HeroType } from '@/payload-types';
import { Block } from '@/utils/types';

export type HeroProps = Block<HeroType>;

export const Hero = ({
  image,
  heading,
  subheading,
  paddingTop,
  paddingBottom,
  breakpoints,
}: HeroProps) => {
  console.log('props: ', { image, heading, subheading });

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} breakpoints={breakpoints}>
      <div className="container">Hero section WIP</div>
    </Section>
  );
};
