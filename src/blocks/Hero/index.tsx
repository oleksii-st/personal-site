import React from 'react';
import {Hero as HeroType} from '@/payload-types';

export type HeroProps = Block<HeroType>;

export const Hero = (props: HeroProps) => {
    return (
        <div>
            props: {JSON.stringify(props)}
        </div>
    );
};