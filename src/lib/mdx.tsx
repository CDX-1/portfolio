import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
    JSX,
    ClassAttributes,
    HTMLAttributes,
    OlHTMLAttributes,
    LiHTMLAttributes,
    BlockquoteHTMLAttributes,
} from "react";
import { FolderColor } from "@/components/photo-folder";

const projectsDirectory = path.join(process.cwd(), "public/projects");

export type Author = {
    name: string;
    github?: string;
    linked?: string;
}

export type ProjectMeta = {
    name: string;
    title: string;
    date: string;
    author: Author[];
    tags: string[];
    color: FolderColor;
    description: string;
    location?: string;
    github?: string;
    images?: string[],
    devpost?: string;
}

export type Project = {
    slug: string;
    meta: ProjectMeta;
    content: string;
};

export function getProjectFiles() {
    return fs.readdirSync(projectsDirectory);
}

export function getProjectBySlug(slug: string): Project {
    const realSlug = slug.replace(/\.mdx$/, "");
    const fullPath = path.join(projectsDirectory, `${realSlug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return { slug: realSlug, meta: data as ProjectMeta, content };
}

export function getAllProjects(): Project[] {
    const files = getProjectFiles();
    const projects = files
        .filter((file) => file.endsWith(".mdx"))
        .map((file) => getProjectBySlug(file));

    return projects.sort(
        (a, b) =>
            new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime(),
    );
}

export const MDXComponents = {
    h1: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLHeadingElement> &
            HTMLAttributes<HTMLHeadingElement>,
    ) => (
        <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-foss mt-12 md:mt-16 mb-6 md:mb-8 tracking-tight text-foreground"
            {...props}
        />
    ),
    h2: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLHeadingElement> &
            HTMLAttributes<HTMLHeadingElement>,
    ) => (
        <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold font-foss mt-12 md:mt-16 mb-4 md:mb-6 tracking-tight text-foreground border-b border-border pb-3 md:pb-4"
            {...props}
        />
    ),
    h3: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLHeadingElement> &
            HTMLAttributes<HTMLHeadingElement>,
    ) => (
        <h3
            className="text-xl md:text-2xl lg:text-3xl font-bold font-foss mt-10 md:mt-12 mb-3 md:mb-4 tracking-tight text-foreground"
            {...props}
        />
    ),
    p: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLParagraphElement> &
            HTMLAttributes<HTMLParagraphElement>,
    ) => (
        <p
            className="text-base md:text-lg leading-relaxed md:leading-loose my-6 md:my-8 text-muted-foreground
                       pl-0 hover:pl-4 border-l-2 border-transparent hover:border-muted-foreground/30
                       transition-all duration-300 ease-out cursor-default"
            {...props}
        />
    ),
    ul: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLUListElement> &
            HTMLAttributes<HTMLUListElement>,
    ) => (
        <ul
            className="list-disc pl-6 md:pl-8 space-y-3 md:space-y-4 my-6 md:my-8 text-muted-foreground"
            {...props}
        />
    ),
    ol: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLOListElement> &
            OlHTMLAttributes<HTMLOListElement>,
    ) => (
        <ol
            className="list-decimal pl-6 md:pl-8 space-y-3 md:space-y-4 my-6 md:my-8 text-muted-foreground"
            {...props}
        />
    ),
    li: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLLIElement> &
            LiHTMLAttributes<HTMLLIElement>,
    ) => (
        <li
            className="leading-relaxed md:leading-loose list-inside pl-2 hover:pl-4
                       transition-all duration-200 ease-out"
            {...props}
        />
    ),
    a: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLAnchorElement> &
            HTMLAttributes<HTMLAnchorElement>,
    ) => (
        <a
            className="font-medium underline underline-offset-4 decoration-border hover:decoration-foreground transition-all text-foreground"
            {...props}
        />
    ),
    code: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLElement> &
            HTMLAttributes<HTMLElement>,
    ) => (
        <code
            className="px-2 py-1 rounded bg-muted font-mono text-sm md:text-base text-foreground"
            {...props}
        />
    ),
    pre: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLPreElement> &
            HTMLAttributes<HTMLPreElement>,
    ) => (
        <pre
            className="p-4 md:p-6 rounded-xl bg-muted border border-border overflow-x-auto text-sm md:text-base my-8 md:my-12"
            {...props}
        />
    ),
    blockquote: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLQuoteElement> &
            BlockquoteHTMLAttributes<HTMLQuoteElement>,
    ) => (
        <blockquote
            className="border-l-4 border-muted-foreground/30 pl-8 md:pl-6 my-6 py-0.5 md:my-8 italic text-muted-foreground bg-muted/60 rounded-r-lg"
            {...props}
        />
    ),
    YouTube: ({ id }: { id: string }) => (
        <div className="my-8 md:my-12 aspect-video w-full">
            <iframe
                className="w-full h-full rounded-xl border border-border"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    ),
};