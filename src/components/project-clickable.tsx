'use client';

import Link from "next/link";
import { ProjectMacbook } from "./project-macbook";
import { ProjectType } from "@/lib/mdx";
import { ProjectIPhone } from "./project-iphone";

interface ProjectMeta {
    name: string;
    description: string;
    main: string;
    images: string[];
    type: ProjectType;
    slug: string;
    tags?: string[];
}

export default function ProjectClickable({ name, description, main, images, type, slug, tags }: ProjectMeta) {
    return (
        <div className="flex flex-col">
            <div className="mx-auto w-full p-12 flex items-center justify-center bg-linear-to-b aspect-square from-gray-200/50 to-gray-300/70 rounded-4xl">
                <Link href={`/projects/${slug}`}>
                    {type == 'laptop' && (
                        <ProjectMacbook
                            main={main}
                            images={images}
                        />
                    )}
                    {type == 'phone' && (
                        <ProjectIPhone
                            main={main}
                            images={images}
                        />
                    )}
                </Link>
            </div>
            <div className="mt-4 px-4">
                <h3 className="font-bespoke font-medium text-2xl tracking-tight">{name}</h3>
                <p className="font-satoshi text-lg tracking-tight text-foreground/70">{description}</p>
                <div className="flex gap-2 mt-4">
                    {tags?.map((tag) => (
                        <span key={tag} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}   