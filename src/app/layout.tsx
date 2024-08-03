import './globals.css';
import { Layout } from '@/components/Layout';
import { ReactNode } from 'react';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { cn } from '@/utils/cn';

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en">
      <head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_CMS_URL}/media/favicon.ico`} />
      </head>

      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
