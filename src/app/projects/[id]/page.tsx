import path from 'path';
import { MarkdownViewer } from '@/components/markdown-viewer';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import * as fs from 'node:fs';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa6';

export default async function ProjectOverview({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const filePath = path.join(process.cwd(), 'content/projects', id + '.mdx');
    const rawFile = fs.readFileSync(filePath, 'utf-8');
    const { content, data } = matter(rawFile);
    const mdxSource = await serialize(content);

    return (
        <div className="px-4 md:px-12 lg:w-4/5 xl:w-3/5 2xl:w-2/5 mt-20 mx-auto py-10 mb-6">
            <h1 className="text-4xl font-bold mb-2">{data.title}</h1>
            <p className="text-muted-foreground mb-6">{data.description}</p>
            <div className="relative w-full h-[400px] overflow-hidden rounded-lg mb-4">
                <Image
                    src={data.backdrop}
                    alt={`${data.title} backdrop`}
                    className="object-cover brightness-50"
                    fill
                />
                <Image
                    src={data.image}
                    alt={`${data.title} main`}
                    fill
                    className="object-cover rounded-lg scale-[85%]"
                />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-nowrap gap-2 items-center overflow-hidden mask-linear-fade flex-1">
                    {data.tags.map((tag: string, i: number) => {
                        const bg = [
                            'bg-chart-1/20',
                            'bg-chart-2/20',
                            'bg-chart-3/20',
                            'bg-chart-4/20',
                            'bg-chart-5/20',
                        ][i % 5];

                        return (
                            <span
                                key={tag}
                                className={`inline-block ${bg} text-accent text-xs font-mono px-2 py-1 rounded-full whitespace-nowrap`}
                            >
                                {tag.toLowerCase()}
                            </span>
                        );
                    })}
                </div>

                <div>
                    {data.github && (
                        <Link href={data.github} target="_blank">
                            <Button variant="link" className="!px-0 !py-0">
                                <FaGithub />
                                <span>github</span>
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            <MarkdownViewer source={mdxSource} />
        </div>
    );
}
