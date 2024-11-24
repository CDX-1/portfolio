import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ArrowUpRightFromSquare } from 'lucide-react';
import Link from 'next/link';

type ShowcaseContentProps = {
    id: string,
    title: string,
    description: string,
    tools: string[]
};

const ShowcaseContent: React.FC<ShowcaseContentProps> = ({
    id,
    title,
    description,
    tools
}) => {
    return (
        <div className="w-auto">
            <div className="flex items-baseline space-x-2">
                <p className="font-bold text-2xl text-white">{title}</p>
                <Link
                    href={"/projects/" + id}
                >
                    <Button variant="link" className="size-5">
                        <ArrowUpRightFromSquare />
                    </Button>
                </Link>
            </div>
            <p className="text-white">{description}</p>
            <div className="space-x-2">
                {tools?.map((tool) => (
                    <Badge key={tool}>{tool}</Badge>
                ))}
            </div>
        </div>
    )
};

export default ShowcaseContent;