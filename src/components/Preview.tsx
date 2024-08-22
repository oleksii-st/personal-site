'use client';

import { useEffect, useState } from 'react';

import { Blocks } from '@/components/Blocks';
import { fetchPreview } from '@/graphql';
import { Spinner } from '@/icons/Spinner';
import { Page } from '@/payload-types';

export const Preview = ({ url }: { url: string }) => {
  const [page, setPage] = useState<Page | null>(null);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [error, setError] = useState('Something went wrong. Probably wrong token');

  useEffect(() => {
    const fetchData = async () => {
      const pageContent = await fetchPreview(url as string);
      if (pageContent && 'id' in pageContent) {
        setPage(pageContent);
      } else {
        setError(pageContent?.message as string);
      }
      setPageLoaded(true);
    };

    fetchData();
  }, []);

  if (!pageLoaded) {
    return (
      <div className="flex flex-auto justify-center items-center">
        <Spinner className="size-[150px] animate-spin" />
      </div>
    );
  }

  if (!page?.layout) {
    return (
      <div className="flex flex-auto justify-center items-center container text-xl">{error}</div>
    );
  }

  return <Blocks blocks={page.layout} />;
};
