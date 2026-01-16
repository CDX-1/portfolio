import { getProjectBySlug, getAllProjects } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";
import {
    JSX,
    ClassAttributes,
    HTMLAttributes,
    OlHTMLAttributes,
    LiHTMLAttributes,
    BlockquoteHTMLAttributes,
} from 'react';
import { AnimatedHeader } from "@/components/animated-header";
import { AnimatedContent } from "@/components/animated-content";
import { AnimatedGallery } from "@/components/animated-gallery";
import { Metadata } from "next";

export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const { slug } = await params;
    const { meta } = getProjectBySlug(slug);

    return {
        title: meta.title,
        description: meta.description,

        openGraph: {
            title: meta.title,
            description: meta.description,
            url: "https://awsaf.dev",
        siteName: "Awsaf's Portfolio",
            images: [
                {
                    url: `https://awsaf.dev/projects/assets/${meta.image}` || "https://awsaf.dev/landing.png",
                    width: 1200,
                    height: 630,
                },
            ],
            type: "article",
        },
    };
}

type Props = {
    params: Promise<{ slug: string }>;
}

const components = {
    h1: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLHeadingElement> &
            HTMLAttributes<HTMLHeadingElement>
    ) => (
        <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold font-foss mt-12 md:mt-16 mb-6 md:mb-8 tracking-tight text-foreground"
            {...props}
        />
    ),
    h2: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLHeadingElement> &
            HTMLAttributes<HTMLHeadingElement>
    ) => (
        <h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold font-foss mt-12 md:mt-16 mb-4 md:mb-6 tracking-tight text-foreground border-b border-border pb-3 md:pb-4"
            {...props}
        />
    ),
    h3: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLHeadingElement> &
            HTMLAttributes<HTMLHeadingElement>
    ) => (
        <h3
            className="text-xl md:text-2xl lg:text-3xl font-bold font-foss mt-10 md:mt-12 mb-3 md:mb-4 tracking-tight text-foreground"
            {...props}
        />
    ),
    p: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLParagraphElement> &
            HTMLAttributes<HTMLParagraphElement>
    ) => (
        <p
            className="text-base md:text-lg leading-relaxed md:leading-loose my-6 md:my-8 text-muted-foreground"
            {...props}
        />
    ),
    ul: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLUListElement> &
            HTMLAttributes<HTMLUListElement>
    ) => (
        <ul
            className="list-disc pl-6 md:pl-8 space-y-3 md:space-y-4 my-6 md:my-8 text-muted-foreground"
            {...props}
        />
    ),
    ol: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLOListElement> &
            OlHTMLAttributes<HTMLOListElement>
    ) => (
        <ol
            className="list-decimal pl-6 md:pl-8 space-y-3 md:space-y-4 my-6 md:my-8 text-muted-foreground"
            {...props}
        />
    ),
    li: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLLIElement> &
            LiHTMLAttributes<HTMLLIElement>
    ) => (
        <li
            className="leading-relaxed md:leading-loose pl-2"
            {...props}
        />
    ),
    a: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLAnchorElement> &
            HTMLAttributes<HTMLAnchorElement>
    ) => (
        <a
            className="font-medium underline underline-offset-4 decoration-border hover:decoration-foreground transition-all text-foreground"
            {...props}
        />
    ),
    code: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLElement> &
            HTMLAttributes<HTMLElement>
    ) => (
        <code
            className="px-2 py-1 rounded bg-muted font-mono text-sm md:text-base text-foreground"
            {...props}
        />
    ),
    pre: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLPreElement> &
            HTMLAttributes<HTMLPreElement>
    ) => (
        <pre
            className="p-4 md:p-6 rounded-xl bg-muted border border-border overflow-x-auto text-sm md:text-base my-8 md:my-12"
            {...props}
        />
    ),
    blockquote: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLQuoteElement> &
            BlockquoteHTMLAttributes<HTMLQuoteElement>
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

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const { content, meta } = getProjectBySlug(slug);
    
    return (
        <main className="min-h-screen pt-24 md:pt-32 lg:pt-40 pb-16 md:pb-24 lg:pb-32">
            <article className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
                <AnimatedHeader meta={meta} />
                
                <div className={cn(
                    "grid gap-12 md:gap-16 lg:gap-24",
                    meta.gallery ? "grid-cols-1 lg:grid-cols-3" : "max-w-4xl mx-auto"
                )}>
                    <AnimatedContent hasGallery={!!meta.gallery}>
                        <MDXRemote source={content} components={components} />
                    </AnimatedContent>
                    
                    {meta.gallery && (
                        <AnimatedGallery gallery={meta.gallery} title={meta.title} />
                    )}
                </div>
            </article>
        </main>
    );
}
