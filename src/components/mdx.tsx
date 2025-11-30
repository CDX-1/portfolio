import {
    JSX,
    ClassAttributes,
    HTMLAttributes,
    OlHTMLAttributes,
    LiHTMLAttributes,
    BlockquoteHTMLAttributes,
} from 'react';

export const mdxComponents = {
    h1: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLHeadingElement> &
            HTMLAttributes<HTMLHeadingElement>
    ) => (
        <h1
            className="text-3xl font-bold mt-8 mb-4 tracking-tight"
            {...props}
        />
    ),
    h2: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLHeadingElement> &
            HTMLAttributes<HTMLHeadingElement>
    ) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
    h3: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLHeadingElement> &
            HTMLAttributes<HTMLHeadingElement>
    ) => <h3 className="text-xl font-semibold mt-5 mb-2" {...props} />,
    p: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLParagraphElement> &
            HTMLAttributes<HTMLParagraphElement>
    ) => (
        <p
            className="text-base text-foreground/80 leading-relaxed my-4"
            {...props}
        />
    ),
    ul: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLUListElement> &
            HTMLAttributes<HTMLUListElement>
    ) => <ul className="list-disc pl-6 space-y-1 my-4" {...props} />,
    ol: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLOListElement> &
            OlHTMLAttributes<HTMLOListElement>
    ) => <ol className="list-decimal pl-6 space-y-1 my-4" {...props} />,
    li: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLLIElement> &
            LiHTMLAttributes<HTMLLIElement>
    ) => <li className="leading-relaxed" {...props} />,
    a: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLAnchorElement> &
            HTMLAttributes<HTMLAnchorElement>
    ) => (
        <a
            className="underline text-accent hover:text-accent/80 transition-colors"
            {...props}
        />
    ),
    code: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLElement> &
            HTMLAttributes<HTMLElement>
    ) => (
        <code
            className="px-1.5 py-[2px] rounded bg-muted font-mono text-sm"
            {...props}
        />
    ),
    pre: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLPreElement> &
            HTMLAttributes<HTMLPreElement>
    ) => (
        <pre
            className="p-4 rounded-lg bg-muted border border-border overflow-x-auto text-sm"
            {...props}
        />
    ),
    blockquote: (
        props: JSX.IntrinsicAttributes &
            ClassAttributes<HTMLQuoteElement> &
            BlockquoteHTMLAttributes<HTMLQuoteElement>
    ) => (
        <blockquote
            className="border-l-4 pl-4 text-muted-foreground italic my-4"
            {...props}
        />
    ),
    YouTube: ({ id }: { id: string }) => (
        <div className="my-6 aspect-video w-full">
            <iframe
                className="w-full h-full rounded-lg"
                src={`https://www.youtube.com/embed/${id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
            />
        </div>
    ),
};
