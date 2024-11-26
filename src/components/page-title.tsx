import React from "react"
import { FadeText } from "./ui/fade-text";

interface PageTitleProps {
    title: string;
    description: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
    return (
        <>
            <FadeText
                className="text-5xl font-bold"
                text={title}
                direction="down"
                framerProps={{
                    show: { transition: { delay: 0.2 } },
                }}
            />
            <div className="pt-2">
                <FadeText
                    className="text-l text-silent"
                    text={description}
                    direction="left"
                    framerProps={{
                        show: { transition: { delay: 0.2 } },
                    }}
                />
            </div>
        </>
    )
};