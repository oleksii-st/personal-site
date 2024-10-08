'use client';

import { useCallback, useRef, useState } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';

import { Media } from '@/components';
import { Section } from '@/components/Section';
import { SectionHeading } from '@/components/SectionHeading';
import { ArrowLeft } from '@/icons/ArrowLeft';
import { ArrowRight } from '@/icons/ArrowRight';
import { Features as FeaturesType } from '@/payload-types';
import { cn } from '@/utils/cn';
import { Block } from '@/utils/types';

export type FeaturesProps = Block<FeaturesType>;

export const Features = ({
  heading,
  features,
  paddingTop,
  paddingBottom,
  breakpoints,
  isFirst,
}: FeaturesProps) => {
  const loading = isFirst ? 'eager' : 'lazy';

  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef<SwiperRef | null>(null);

  if (!features?.length) {
    return null;
  }

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <Section paddingTop={paddingTop} paddingBottom={paddingBottom} breakpoints={breakpoints}>
      <div className="container">
        {heading && <SectionHeading isFirst={isFirst}>{heading}</SectionHeading>}

        <div
          className={cn(
            'flex gap-4 items-center w-full mx-auto',
            'min-[420px]:max-w-[398px]',
            'min-[576px]:max-w-[688px]',
            'sm:max-w-[881px]',
            'min-[1099px]:max-w-[100%]',
          )}
        >
          <button
            className={cn('opacity-100 transition-opacity text-[--text-color]', 'hover:opacity-50')}
            onClick={handlePrev}
          >
            <ArrowLeft aria-label="Go to prevoius slide" />
          </button>

          <Swiper
            className="swiper features-swiper"
            modules={[Navigation, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            grabCursor={true}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            breakpoints={{
              576: {
                slidesPerView: 2,
                spaceBetween: 36,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 36,
              },
              1099: {
                slidesPerView: 4,
                spaceBetween: 36,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
              1360: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            }}
            ref={sliderRef}
            loop
          >
            {features.map(({ icon }, index) => (
              <SwiperSlide className={cn('!h-auto')} key={index}>
                {({ isActive }) => (
                  <div
                    className={cn(
                      'h-full aspect-square flex justify-center items-center bg-white border-2 rounded-2xl',
                      { 'xs:border-blue-700  xs:border-4': isActive },
                    )}
                  >
                    <Media
                      className="aspect-square object-contain w-[70%] max-w-[130px] m-4"
                      source={icon}
                      width={130}
                      height={130}
                      loading={loading}
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            className={cn('opacity-100 transition-opacity text-[--text-color]', 'hover:opacity-50')}
            onClick={handleNext}
          >
            <ArrowRight aria-label="Go to next slide" />
          </button>
        </div>

        {features.map(({ description }, index) => (
          <div
            key={index}
            className={cn('mx-0 mt-8 text-lg', 'xs:mx-[66px]', { hidden: activeSlide !== index })}
          >
            {description}
          </div>
        ))}
      </div>
    </Section>
  );
};
