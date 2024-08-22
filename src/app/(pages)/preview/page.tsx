import { notFound } from 'next/navigation';

import { Preview } from '@/components/Preview';

const Page = async ({ searchParams }: { searchParams: { [key: string]: string | undefined } }) => {
  const url = searchParams['url'];

  if (!url) {
    return notFound();
  }

  return <Preview url={url} />;
};

export default Page;
