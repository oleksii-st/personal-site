import { ComponentProps, ReactNode, useId } from 'react';

type SectionProps = ComponentProps<'section'> & {
  paddingTop?: number | null;
  paddingBottom?: number | null;
  breakpoints?:
    | {
        breakpoint?: number | null;
        paddingTop?: number | null;
        paddingBottom?: number | null;
        id?: string | null;
      }[]
    | null;
  children: ReactNode;
};

export const Section = ({
  paddingTop,
  paddingBottom,
  breakpoints,
  children,
  ...rest
}: SectionProps) => {
  const id = useId();

  const generateMediaQuery = (breakpoint: NonNullable<SectionProps['breakpoints']>[number]) => {
    if (!breakpoint) return '';
    const { breakpoint: maxWidth, paddingTop, paddingBottom } = breakpoint;
    if (!maxWidth && paddingTop && paddingBottom) return '';

    return `
      @media screen and (max-width: ${maxWidth}px) {
       [id="${id}"] {
          padding-top: ${paddingTop}px;
          padding-bottom: ${paddingBottom}px; 
        }
      }
    `;
  };

  const initialStyles = `
    [id="${id}"] {
        padding-top: ${paddingTop}px;
        padding-bottom: ${paddingBottom}px;
    }
  `;

  return (
    <section {...rest} id={id}>
      {breakpoints && (
        <style
          dangerouslySetInnerHTML={{
            __html: initialStyles + breakpoints.map(generateMediaQuery).join('\n') || '',
          }}
        />
      )}

      {children}
    </section>
  );
};
