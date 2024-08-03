import {ReactNode } from 'react';
import {fetchGlobals} from "@/graphql";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import {cn} from "@/utils/cn";

export const Layout = async ({children}: {children: ReactNode}) => {
  const {header, footer, settings: {container, horizontalPaddings, backgroundColor, textColor, headingsColor}} = await fetchGlobals();

  const styles = {
      '--container-width': `${container}px`,
      '--container-padding': `${horizontalPaddings}px`,
      '--headings-color': headingsColor,
      backgroundColor,
      color: textColor,
  };

  return (
      <div className={cn('flex flex-col min-h-[100vh]')} style={styles}>
          <Header {...header} />
              <main className={cn('flex-auto')}>
                  {children}
              </main>
          <Footer {...footer} />
      </div>
  );
};