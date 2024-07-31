import React, {DetailedHTMLProps, ImgHTMLAttributes} from 'react';
import { getImageProps } from 'next/image'

type Props = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
    alt: string;
    src: string;
    width: number;
    height: number;
    breakpoints?: {
        viewport: number;
        width: number;
        height: number;
        src?: string;
    }[]
}

export const Picture = ({breakpoints, width, height, alt, ...rest}: Props) => {
    const originalSrc = rest.src;
    const { props: {srcSet, src} } = getImageProps({width, height, src: originalSrc , alt})

    const isRaster = breakpoints?.length && src !== originalSrc;

    return (
        <picture>
            {
                isRaster && breakpoints?.map(({viewport, width, height,src = originalSrc}, index) => {
                    const { props: { srcSet  } } = getImageProps({width, height, src , alt});

                    return <source media={`(max-width: ${viewport}px)`} key={index} srcSet={srcSet} width={width} height={height} />
                })
            }

            <img
                {...rest}
                src={src}
                srcSet={srcSet}
                width={width}
                height={height}
                alt={alt}
            />
        </picture>
    );
};