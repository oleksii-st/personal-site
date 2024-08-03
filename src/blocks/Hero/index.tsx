import React from 'react';
import { Hero as HeroType } from '@/payload-types';
import { Block } from '@/utils/types';

export type HeroProps = Block<HeroType>;

export const Hero = (props: HeroProps) => {
  console.log('props: ', props);

  return <div>Hero section WIP</div>;
};
