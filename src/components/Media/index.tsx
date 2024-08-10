import Image, { ImageProps } from 'next/image';

import { Media as MediaType } from '@/payload-types';

type MediaProps = Omit<ImageProps, 'alt' | 'src'> & {
  source: MediaType;
};

export const Media = ({ source: { alt, url, width, height }, ...rest }: MediaProps) => {
  const src = `${process.env.NEXT_PUBLIC_CMS_URL}${url}`;

  return (
    <div>
      <Image
        {...rest}
        alt={alt}
        src={src}
        width={Number(rest.width ?? width)}
        height={Number(rest.height ?? height)}
      />
    </div>
  );
};
