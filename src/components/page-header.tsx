import { PageTitle } from '@/components/page-title';

import React from "react";
import RetroGrid from './ui/retro-grid';
import { Separator } from './ui/separator';

interface PageHeaderProps {
    title: string;
    description: string;
};

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
    return (
        <>
            <div className="mb-16 mt-6 sm:mb-8 sm:mt-12 w-full relative text-center py-2">
                <div className="absolute inset-0 flex justify-center items-center -z-10">
                    <RetroGrid />
                </div>
                <PageTitle title={title} description={description} />
            </div>
            <Separator orientation="horizontal" />
        </>
    )
}