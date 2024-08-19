import { ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/toaster';
import { fetchGlobals } from '@/graphql';
import { cn } from '@/utils/cn';

export const Layout = async ({ children }: { children: ReactNode }) => {
  const {
    header,
    footer,
    settings: {
      container,
      horizontalPaddings,
      horizontalPaddingsDesktop,
      backgroundColor,
      textColor,
      headingsColor,
    },
  } = await fetchGlobals();

  const styles = {
    '--container-width': `${container}px`,
    '--container-padding': `${horizontalPaddings}px`,
    '--container-padding-desktop': `${horizontalPaddingsDesktop}px`,
    '--headings-color': headingsColor,
    backgroundColor,
    color: textColor,
  };

  return (
    <div className="flex flex-col min-h-[100vh]" style={styles}>
      <Header {...header} />
      <main
        className={cn(
          'prose prose-basic prose-code:bg-[#F4F5F7] prose-code:before:content-none prose-code:after:content-none prose-code:px-0.5 prose-code:py-1 prose-h2:mt-0',
          'flex-auto flex flex-col max-w-full',
        )}
      >
        {children}
      </main>
      <Footer {...footer} />
      <Toaster />
    </div>
  );
};
