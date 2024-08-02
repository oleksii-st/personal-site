import React from 'react';
import {Header as HeaderType} from "@/payload-types"

export const Header = ({logo}: HeaderType) => {
    return (
        <header>
            logo: {JSON.stringify(logo)}
        </header>
    );
};