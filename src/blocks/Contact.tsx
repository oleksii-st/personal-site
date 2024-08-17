import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { Contact as ContactType } from '@/payload-types';
import { Block } from '@/utils/types';

export type ContactProps = Block<ContactType>;

export const Contact = ({
  heading,
  nameLabel,
  emailLabel,
  topicLabel,
  messageLabel,
  isFirst,
  paddingTop,
  paddingBottom,
  breakpoints,
}: ContactProps) => {
  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} breakpoints={breakpoints}>
      <div className="container">
        {heading && <SectionHeading isFirst={isFirst}>{heading}</SectionHeading>}
        {JSON.stringify({
          nameLabel,
          emailLabel,
          topicLabel,
          messageLabel,
        })}
      </div>
    </Section>
  );
};
