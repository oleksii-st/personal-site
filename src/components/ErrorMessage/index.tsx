import { HTMLAttributes } from 'react';
import { NotFound } from '@/payload-types';
import { RichText } from '@/components/RichText';

type ErrorMessageProps = HTMLAttributes<HTMLDivElement> & {
  heading?: NotFound['heading'];
  description?: NotFound['description'];
};

export const ErrorMessage = ({ heading, description, ...rest }: ErrorMessageProps) => {
  return (
    <div {...rest}>
      {heading && <h1>{heading}</h1>}

      {description && <RichText content={description} />}
    </div>
  );
};
