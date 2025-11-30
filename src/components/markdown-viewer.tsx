'use client';

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { mdxComponents } from './mdx';

interface MarkdownViewerProps {
    source: MDXRemoteSerializeResult;
}

export const MarkdownViewer = ({ source }: MarkdownViewerProps) => {
    return (
        <article className="prose prose-invert max-w-none">
            <MDXRemote {...source} components={mdxComponents} />
        </article>
    );
};
