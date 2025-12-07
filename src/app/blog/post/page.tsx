'use client';

import { Header } from '@/components/header';
import LoginButton from '@/components/login';
import { FaPlusSquare } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { FaArrowRight, FaTerminal } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { postSchema } from '@/lib/schemas';
import { PopupAlert } from '@/components/popup-alert';
import { AlertDescription, AlertTitle } from '@/components/ui/alert';
import { z } from 'zod';

export default function BlogPostPage() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [currentKeyword, setCurrentKeyword] = useState('');
    const [keywords, setKeywords] = useState<string[]>([]);
    const [keywordLabel, setKeywordLabel] = useState('Keywords (0/6)');
    const [content, setContent] = useState('');
    const [slug, setSlug] = useState('');

    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const messageRef = useRef(false);

    const maxKeywords = 6;
    const maxKeywordLength = 15;

    const addKeyword = () => {
        if (currentKeyword === '') return;
        if (keywords.length >= maxKeywords) return;
        if (currentKeyword.length >= maxKeywordLength) return;
        if (keywords.includes(currentKeyword.toLowerCase())) return;
        setKeywords((prev) => [...prev, currentKeyword.toLowerCase()]);
        setCurrentKeyword('');
    };

    const removeKeyword = (keyword: string) => {
        setKeywords(prev => prev.filter(kw => kw !== keyword));
    };

    useEffect(() => {
        setKeywordLabel(`Keywords (${keywords.length}/${maxKeywords})`);
    }, [keywords]);

    const post = async () => {
        if (messageRef.current) return;
        const body = { title, slug, content, keywords };
        const parseResult = postSchema.safeParse(body);

        if (!parseResult.success) {
            setMessage(z.prettifyError(parseResult.error));
            setShowMessage(true);
            messageRef.current = true;
            setTimeout(() => {
                setShowMessage(false);
                messageRef.current = false;
            }, 1000);
            return;
        }

        const res = await fetch('/api/blog/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify(body),
        });

        const resBody = await res.json();
        if (resBody.ok) {
            router.push(`/blog/${body.slug}`);
        }
    };

    return (
        <>
            <PopupAlert
                variant="destructive"
                open={showMessage}
            >
                <FaTerminal />
                <AlertTitle className="font-semibold">
                    Error
                </AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </PopupAlert>

            <div className="w-11/12 md:w-2/5 mt-24 md:mt-40 mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <Header>
                        <FaPlusSquare className="text-accent" />
                        <span>Create Post</span>
                    </Header>

                    <LoginButton create={false} />
                </div>

                <div className="space-y-6">
                    <div className="flex space-x-6">
                        <div className="space-y-2 flex-1">
                            <Label className="font-mono">Title</Label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Some cool title"
                            />
                        </div>

                        <div className="space-y-2 w-1/3">
                            <Label className="font-mono">Slug</Label>
                            <Input
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="/blog/slug-here"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="font-mono">{keywordLabel}</Label>
                        <div className="flex items-center space-x-4 overflow-hidden">
                            <Input
                                value={currentKeyword}
                                onChange={(e) =>
                                    setCurrentKeyword(e.target.value)
                                }
                                className="w-1/5 flex shrink-0"
                                placeholder="React Native"
                                onKeyDown={(e) => {
                                    if (e.code !== 'Enter') return;
                                    addKeyword();
                                }}
                            />

                            <div className="flex gap-3 whitespace-nowrap flex-none overflow-hidden">
                                {keywords.map((keyword, i) => {
                                    return (
                                        <Badge
                                            key={`${keyword}-${i}`}
                                            className="px-4 py-2 rounded-lg font-semibold font-mono hover:cursor-pointer hover:bg-accent hover:text-accent-foreground dark:hover:bg-input/50"
                                            onClick={() => removeKeyword(keyword)}
                                            variant="outline"
                                        >
                                            {keyword}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="font-mono">Body</Label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-96"
                        />
                    </div>

                    <div className="flex w-full justify-end">
                        <Button
                            className="font-semibold font-mono !px-4"
                            variant="outline"
                            onClick={post}
                        >
                            <span>Post</span>
                            <FaArrowRight className="!size-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
