import React, {HTMLAttributes} from 'react';
import {Header as HeaderType} from "@/payload-types"

type HeaderProps = HTMLAttributes<HTMLHeadingElement> & HeaderType;

export const Header = ({logo, ...rest}: HeaderProps) => {
    return (
        <header {...rest}>
            logo: {JSON.stringify(logo)}
        </header>
    );
};