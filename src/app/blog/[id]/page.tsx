import { MarkdownViewer } from '@/components/markdown-viewer';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function BlogPost({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/blog/post/${id}`);
    const post = await res.json();
    if (res.status !== 200 || !post) {
        return redirect('/+not-found.tsx');
    }
    const { content } = matter(post.content);
    const mdxSource = await serialize(content);

    return (
        <div className="px-4 md:px-12 lg:w-4/5 xl:w-3/5 2xl:w-2/5 mt-20 mx-auto py-10 mb-6">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center">
                <Image
                    src={post.author.avatar_url}
                    alt={`${post.author.username} avatar`}
                    width={18}
                    height={18}
                    className="rounded-full mr-2"
                />
                <p className="text-muted-foreground">
                    <span className="font-semibold">
                        {post.author.username}
                    </span>{' '}
                    <span className="text-foreground">—</span>{' '}
                    {new Date(post.created_at).toDateString()}
                </p>
            </div>

            {post.keywords.length > 0 && (
                <div className="flex justify-between items-center mt-6">
                    <div className="flex flex-nowrap gap-2 items-center overflow-hidden mask-linear-fade flex-1">
                        {post.keywords.map((keyword: string, i: number) => {
                            const bg = [
                                'bg-chart-1/20',
                                'bg-chart-2/20',
                                'bg-chart-3/20',
                                'bg-chart-4/20',
                                'bg-chart-5/20',
                            ][i % 5];

                            return (
                                <span
                                    key={keyword}
                                    className={`inline-block ${bg} text-accent text-xs font-mono px-2 py-1 rounded-full whitespace-nowrap`}
                                >
                                {keyword.toLowerCase()}
                            </span>
                            );
                        })}
                    </div>
                </div>
            )}

            <MarkdownViewer source={mdxSource} />
        </div>
    );
}
