import "./globals.css";
import {Layout} from "@/components/Layout";
import {ReactNode} from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children:ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_CMS_URL}/media/favicon.ico`}/>
      </head>

      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
