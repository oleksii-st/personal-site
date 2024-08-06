import { ReactNode } from 'react';
import { fetchGlobals } from '@/graphql';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { cn } from '@/utils/cn';

export const Layout = async ({ children }: { children: ReactNode }) => {
  const {
    header,
    footer,
    settings: { container, horizontalPaddings, backgroundColor, textColor, headingsColor },
  } = await fetchGlobals();

  const styles = {
    '--container-width': `${container}px`,
    '--container-padding': `${horizontalPaddings}px`,
    '--headings-color': headingsColor,
    backgroundColor,
    color: textColor,
  };

  return (
    <div className="flex flex-col min-h-[100vh]" style={styles}>
      <Header {...header} />
      <main className={cn('prose', 'flex-auto flex flex-col pt-5 pb-5 max-w-full')}>
        {children}
      </main>
      <Footer {...footer} />
    </div>
  );
};
