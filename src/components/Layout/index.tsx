import {ReactNode } from 'react';
import {fetchGlobals} from "@/graphql";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";

export const Layout = async ({children}: {children: ReactNode}) => {
  const {header, footer, settings: {container, horizontalPaddings, backgroundColor, textColor, headingsColor}} = await fetchGlobals();

  const styles = {
      '--container-width': `${container}px`,
      '--container-padding': `${horizontalPaddings}px`,
      '--headings-color': headingsColor,
      backgroundColor,
      textColor,
  };

  return (
      <div style={styles}>
          <Header {...header} />
              <main>
                  {children}
              </main>
          <Footer {...footer} />
      </div>
  );
};