import React from 'react';

import { Media } from '@/components';
import { CMSLink } from '@/components/CMSLink';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Socials as SocialsType } from '@/payload-types';
import { cn } from '@/utils/cn';
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
          <div className={cn('flex gap-16 flex-wrap flex-col items-center', 'xs:flex-row')}>
            {socials.map(({ link, icon }, index) => {
              if (!link || !icon) {
                return null;
              }

              return (
                <CMSLink
                  key={index}
                  className={cn(
                    'w-[200px] max-w-[100%] scale-100 transition duration-300',
                    'hover:scale-110',
                  )}
                  {...link}
                >
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
