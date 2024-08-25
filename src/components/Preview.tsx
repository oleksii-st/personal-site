'use client';

import { useLivePreview } from '@payloadcms/live-preview-react';
import React, { useEffect, useState } from 'react';

import { Blocks } from '@/components/Blocks';
import { ErrorMessage, ErrorMessageProps } from '@/components/ErrorMessage';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { fetchPreview, PreviewContent } from '@/graphql';
import { Spinner } from '@/icons/Spinner';
import { Page, Header as HeaderType, Footer as FooterType } from '@/payload-types';

type PreviewProps = {
  url: string;
};

const getLayout = (obj: null | undefined | { layout?: Page['layout'] }) =>
  obj && 'layout' in obj ? obj.layout : undefined;

const styleInnerHTML = `
    body > div > header, body > div > footer {
        display: none;
    }
`;

export const Preview = ({ url }: PreviewProps) => {
  const [previewContent, setPreviewContent] = useState<PreviewContent>(null);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [error, setError] = useState('Something went wrong. Probably wrong token');

  useEffect(() => {
    const fetchData = async () => {
      if (!url) return;
      const data = await fetchPreview(url, { revalidate: 0 });
      if (!data || 'message' in data) {
        setError(data?.message as string);
      } else {
        setPreviewContent(data);
      }
      setLoaded(true);
    };

    fetchData();
  }, [url]);

  const { data } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_CMS_URL || '',
    depth: 5,
    initialData: previewContent,
  });

  const layout = getLayout(data as Page) ?? getLayout(previewContent as Page);

  if (previewContent && 'logo' in (previewContent || {})) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: styleInnerHTML }} />
        <Header {...(data as HeaderType)} />
      </>
    );
  }

  if (previewContent && 'columns' in (previewContent || {})) {
    return (
      <>
        <style dangerouslySetInnerHTML={{ __html: styleInnerHTML }} />
        <Footer {...(data as FooterType)} />
      </>
    );
  }

  if (previewContent && 'heading' in (previewContent || {})) {
    return <ErrorMessage {...(data as ErrorMessageProps)} />;
  }

  if (!isLoaded) {
    return (
      <div className="flex flex-auto justify-center items-center">
        <Spinner className="size-[150px] animate-spin" />
      </div>
    );
  }

  if (!layout) {
    return (
      <div className="flex flex-auto justify-center items-center container text-xl">{error}</div>
    );
  }

  return <Blocks blocks={layout} />;
};
