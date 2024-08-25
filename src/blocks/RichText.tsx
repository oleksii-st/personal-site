'use client';

import React from 'react';

import { RichText } from '@/components/RichText';
import { Section } from '@/components/Section';
import { Richtext as RichTextBlockType } from '@/payload-types';
import { Block } from '@/utils/types';

export type RichTextBlockProps = Block<RichTextBlockType>;

export const RichTextBlock = ({
  content,
  paddingTop,
  paddingBottom,
  breakpoints,
}: RichTextBlockProps) => {
  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} breakpoints={breakpoints}>
      <div className="container">
        <RichText content={content} />
      </div>
    </Section>
  );
};
