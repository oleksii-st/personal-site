'use client';

import { Formik, Form, FormikValues } from 'formik';
import { ComponentProps } from 'react';

import { Input } from '@/components/Input';

type ContactFormProps = ComponentProps<'div'> & {
  nameLabel?: string;
  emailLabel?: string;
  topicLabel?: string;
  messageLabel?: string;
};

export const ContactForm = ({
  nameLabel,
  emailLabel,
  topicLabel,
  messageLabel,
}: ContactFormProps) => {
  const validate = (values: FormikValues) => {
    const errors: Record<string, string> = {};

    const { name, email, topic, message } = values;

    if (!name) {
      errors.name = 'Required';
    } else if (name.length < 3) {
      errors.name = 'Name must be more than 2 symbols';
    }

    if (!email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!topic) {
      errors.topic = 'Required';
    } else if (name.length < 3) {
      errors.name = 'Topic must be more than 2 symbols';
    }

    if (!message) {
      errors.message = 'Required';
    } else if (message.length < 3) {
      errors.name = 'Message must be more than 20 symbols';
    }

    return errors;
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '', email: '', topic: '', message: '' }}
        validate={validate}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, errors, touched }) => {
          const checkError = (field: string): boolean => {
            return (
              (touched as Record<string, boolean>)[field] && Object.keys(errors).includes(field)
            );
          };

          return (
            <Form className="flex flex-wrap gap-x-4 gap-y-6 max-w-[900px] mx-auto">
              <div className="w-[calc(50%-8px)]">
                <Input type="text" name="name" label={nameLabel} error={checkError('name')} />
              </div>

              <div className="w-[calc(50%-8px)]">
                <Input type="email" name="email" label={emailLabel} error={checkError('email')} />
              </div>

              <div className="w-full">
                <Input type="text" name="topic" label={topicLabel} error={checkError('topic')} />
              </div>

              <div className="w-full">
                <Input
                  component="textarea"
                  name="message"
                  label={messageLabel}
                  error={checkError('message')}
                />
              </div>

              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
