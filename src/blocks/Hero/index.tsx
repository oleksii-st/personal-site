import React from 'react';
import { Hero as HeroType } from '@/payload-types';
import { Block } from '@/utils/types';
import { Section } from '@/components/Section';

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
