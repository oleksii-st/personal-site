import React, {HTMLAttributes} from 'react';
import {Footer as FooterType} from "@/payload-types"
import {cn} from "@/utils/cn";
import {CMSLink} from "@/components/CMSLink";

type HeaderProps = HTMLAttributes<HTMLElement> & FooterType;

export const Footer = ({columns, copyright, ...rest}: HeaderProps) => {
    const copyrighText = copyright?.replaceAll("{{year}}", String(new Date().getFullYear()));

    return (
        <footer {...rest}>
            <div className={cn("container")}>
                <div className={cn("flex flex-col gap-4 py-4 text-md", "sm:text:lg sm:py-6")}>
                    {
                        columns?.length && <div className={cn("flex flex-col gap-4 items-center", "sm:flex-row sm:justify-between")}>
                            {
                                columns?.map((column, index) => (
                                    <div key={index} className={cn("flex flex-col text-center gap-4", "sm:flex-row")}>
                                        {
                                            column.navItems?.map(({link}, index) => (
                                                <CMSLink key={index} className={cn("text-link ")} {...link}/>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    }

                    <div className={cn("text-center")}>
                        {copyrighText}
                    </div>
                </div>
            </div>
        </footer>
    );
};