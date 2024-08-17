import React from 'react';

import { Media } from '@/components';
import { CMSLink } from '@/components/CMSLink';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Socials as SocialsType } from '@/payload-types';
import { Block } from '@/utils/types';

export type SocialsProps = Block<SocialsType>;

export const Socials = ({
  heading,
  socials,
  isFirst,
  paddingTop,
  paddingBottom,
  breakpoints,
}: SocialsProps) => {
  const loading = isFirst ? 'eager' : 'lazy';

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} breakpoints={breakpoints}>
      <div className="container">
        {heading && <SectionHeading isFirst={isFirst}>{heading}</SectionHeading>}

        {socials?.length && (
          <div className="flex gap-16 flex-wrap flex-col items-center xs:flex-row">
            {socials.map(({ link, icon }, index) => {
              if (!link || !icon) {
                return null;
              }

              return (
                <CMSLink key={index} className="w-[200px] max-w-[100%]" {...link}>
                  <Media className="m-0" source={icon} width={200} height={200} loading={loading} />
                </CMSLink>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
};
