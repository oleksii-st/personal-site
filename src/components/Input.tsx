'use client';

import { ErrorMessage, Field } from 'formik';
import { ComponentProps, useId } from 'react';

import { cn } from '@/utils/cn';

type InputProps = ComponentProps<typeof Field> & {
  label?: string;
  error: boolean;
};

export const Input = ({ label, name, className, error, ...rest }: InputProps) => {
  const id = useId();

  return (
    <>
      {label && (
        <label className="inline-block mb-1 font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <Field {...rest} id={id} name={name} className={cn(className, 'input', { error })} />
      <ErrorMessage
        name={name}
        className="absolute py-1 font-medium text-xs text-red-600"
        component="div"
      />
    </>
  );
};
