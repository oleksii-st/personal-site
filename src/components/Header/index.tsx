import React, {HTMLAttributes} from 'react';
import {Header as HeaderType} from "@/payload-types"
import Link from "next/link";
import {cn} from "@/utils/cn";

type HeaderProps = HTMLAttributes<HTMLHeadingElement> & HeaderType;

export const Header = ({logo, ...rest}: HeaderProps) => {
    return (
        <header {...rest}>
            <div className={cn("container")}>
                <div className={cn("flex py-4")}>
                    {
                        logo && <Link href="/" className={cn("font-bold text-2xl opacity-100 transition duration-300", "hover:opacity-70")}>{logo}</Link>
                    }
                </div>
            </div>
        </header>
    );
};