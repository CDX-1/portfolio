'use client';

import { Header } from '@/components/header';
import { FaBackward, FaForward, FaMessage } from 'react-icons/fa6';
import { BlogPostCard } from '@/components/blog-post-card';
import LoginButton from '@/components/login';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'motion/react';
import { stripMarkdown } from '@/lib/utils';

interface Post {
    id: number;
    slug: string;
    title: string;
    content: string;
    keywords: string[];
    created_at: string;
    author: {
        id: string;
        username: string;
        avatar_url: string;
    };
}

export default function BlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [totalPosts, setTotalPosts] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchPosts = async (page: number) => {
        const res = await fetch("/api/blog/posts?page=" + page);
        if (res.status !== 200) {
            setPosts([]);
            return;
        }
        const data = await res.json();
        setPosts(data.posts);
        setTotalPosts(data.total);
        setCurrentPage(data.page);
        setTotalPages(data.totalPages === 0 ? 1 : data.totalPages);
    };

    const castToNumber = (value: string) => {
        const cleaned = value.replace(/\D+/g, "");
        const num = Number(cleaned || "1");
        return Math.max(1, num);
    };

    useEffect(() => {
        fetchPosts(currentPage);
    }, [currentPage]);

    return (
        <div className="w-11/12 md:w-2/5 mt-24 md:mt-40 mx-auto space-y-8 mb-6">
            <div className="flex items-center justify-between">
                <Header>
                    <FaMessage className="text-accent" />
                    <span>Blog</span>
                </Header>

                <LoginButton />
            </div>

            {posts.length === 0 && (
                <p className="font-mono text-center">No posts to show!</p>
            )}

            {posts.map((post, i) => (
                <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: (0.2 + i * 0.05) }}
                >
                    <BlogPostCard
                        slug={post.slug}
                        title={post.title}
                        content={stripMarkdown(post.content)}
                        date={new Date(post.created_at)}
                        keywords={post.keywords}
                        author={{
                            name: post.author.username,
                            avatarUrl: post.author.avatar_url,
                        }}
                    />
                </motion.div>
            ))}

            <div className="flex flex-col justify-center items-center w-full px-10 gap-y-4">
                <div className="flex justify-center items-center space-x-4 mb-2">
                    <Button
                        variant="ghost"
                        className="flex items-center"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    >
                        <FaBackward />
                        <span>Previous</span>
                    </Button>

                    <Input
                        value={currentPage}
                        onChange={(e) => setCurrentPage(castToNumber(e.target.value))}
                        className="w-1/12"
                        placeholder="1"
                    />

                    <Button
                        variant="ghost"
                        className="flex items-center"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    >
                        <span>Forward</span>
                        <FaForward />
                    </Button>
                </div>
                <p className="font-mono text-xs">{totalPosts} posts | {totalPages} pages</p>
            </div>
        </div>
    );
}
