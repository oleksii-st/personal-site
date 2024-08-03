import React, {HTMLAttributes} from 'react';
import {Footer as FooterType} from "@/payload-types"

type HeaderProps = HTMLAttributes<HTMLElement> & FooterType;

export const Footer = ({columns, copyright, ...rest}: HeaderProps) => {
    return (
        <footer {...rest}>
            columns: {JSON.stringify(columns)} <br />
            copyright: {copyright} <br />
        </footer>
    );
};