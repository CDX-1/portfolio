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

import type { ComponentPropsWithoutRef } from "react";

type ComponentProps<T extends keyof JSX.IntrinsicElements> = ComponentPropsWithoutRef<T>;

export const MDXComponents = {
    h1: (props: ComponentProps<"h1">) => (
        <h1
            className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground mt-16 mb-6 antialiased"
            {...props}
        />
    ),
    h2: (props: ComponentProps<"h2">) => (
        <h2
            className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground mt-14 mb-4 pb-2 border-b border-border/40 antialiased"
            {...props}
        />
    ),
    h3: (props: ComponentProps<"h3">) => (
        <h3
            className="text-xl md:text-2xl font-semibold tracking-tight text-foreground mt-10 mb-3 antialiased"
            {...props}
        />
    ),
    p: (props: ComponentProps<"p">) => (
        <p
            className="text-[17px] leading-relaxed my-5 text-muted-foreground/90 font-normal antialiased selection:bg-primary/10"
            {...props}
        />
    ),
    ul: (props: ComponentProps<"ul">) => (
        <ul
            className="list-disc pl-5 my-5 space-y-2.5 text-[17px] text-muted-foreground/90"
            {...props}
        />
    ),
    ol: (props: ComponentProps<"ol">) => (
        <ol
            className="list-decimal pl-5 my-5 space-y-2.5 text-[17px] text-muted-foreground/90"
            {...props}
        />
    ),
    li: (props: ComponentProps<"li">) => (
        <li
            className="leading-relaxed pl-1 marker:text-muted-foreground/40"
            {...props}
        />
    ),
    a: (props: ComponentProps<"a">) => (
        <a
            className="font-medium text-foreground underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-foreground transition-colors duration-200 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            {...props}
        />
    ),
    code: (props: ComponentProps<"code">) => (
        <code
            className="px-1.5 py-0.5 rounded-md bg-muted/70 border border-border/30 font-mono text-[14px] text-foreground tracking-tight"
            {...props}
        />
    ),
    pre: (props: ComponentProps<"pre">) => (
        <pre
            className="p-5 md:p-6 rounded-2xl bg-muted/40 border border-border/50 overflow-x-auto text-[14px] font-mono leading-relaxed my-8 backdrop-blur-[2px]"
            {...props}
        />
    ),
    blockquote: (props: ComponentProps<"blockquote">) => (
        <blockquote
            className="border-l-3 border-primary/40 pl-6 my-8 text-[18px] font-normal italic text-muted-foreground/80 bg-muted/20 py-1 pr-4 rounded-r-xl"
            {...props}
        />
    ),
    YouTube: ({ id }: { id: string }) => (
        <div className="my-10 aspect-video w-full overflow-hidden rounded-2xl border border-border/40 shadow-sm bg-muted/20">
            <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    ),
};