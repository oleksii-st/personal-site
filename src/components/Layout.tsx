import { ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/Toaster';
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
      backgroundColorLight,
      textColorLight,
      headingsColorLight,
      backgroundColorDark,
      textColorDark,
      headingsColorDark,
    },
  } = await fetchGlobals();

  const styles = `
  html {
  --container-width: ${container}px;
    --container-padding: ${horizontalPaddings}px;
    --container-padding-desktop: ${horizontalPaddingsDesktop}px;
    
      @media (prefers-color-scheme: light) {
        --headings-color: ${headingsColorLight};
        --background-color: ${backgroundColorLight};
        --text-color: ${textColorLight};
      }
      
      @media (prefers-color-scheme: dark) {
        --headings-color: ${headingsColorDark};
        --background-color: ${backgroundColorDark};
        --text-color: ${textColorDark};
      }
  }
  
  .light {
      --headings-color: ${headingsColorLight};
      --background-color: ${backgroundColorLight};
      --text-color: ${textColorLight};
  }
  
  .dark {
      --headings-color: ${headingsColorDark};
      --background-color: ${backgroundColorDark};
      --text-color: ${textColorDark};
  }
  `;

  return (
    <div className="flex flex-col min-h-[100vh]">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <Header {...header} />
      <main
        className={cn(
          'prose prose-basic prose-code:text-[var(--code-inline-color)] prose-code:bg-[var(--code-inline-bg-color)] prose-code:before:content-none prose-code:after:content-none prose-code:px-0.5 prose-code:py-1 prose-h2:mt-0',
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
