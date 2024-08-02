import React from 'react';
import {Footer as FooterType} from "@/payload-types"

export const Footer = ({columns, copyright}: FooterType) => {
    return (
        <footer>
            columns: {JSON.stringify(columns)} <br />
            copyright: {copyright} <br />
        </footer>
    );
};