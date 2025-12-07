'use client';

import { FaPlus, FaRightFromBracket, FaRightToBracket } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/hooks/useUser';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';

interface LoginButtonProps {
    create?: boolean;
    logout?: boolean;
}

export default function LoginButton({ create = true, logout = true }: LoginButtonProps) {
    const supabase = createClient();
    const user = useUser();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const hoverTimer = useRef<NodeJS.Timeout | null>(null);

    const handleClick = () => {
        if (!user) router.push('/login');
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setOpen(false);
    };

    const handleCreate = () => {
        router.push("/blog/post");
    }

    const handleMouseEnter = () => {
        if (!user) return;
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        setOpen(true);
    };

    const handleMouseLeave = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);

        hoverTimer.current = setTimeout(() => {
            setOpen(false);
        }, 150);
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Button
                size="lg"
                variant="outline"
                className="flex items-center font-semibold space-x-1"
                onClick={handleClick}
            >
                {user ? (
                    <div className="flex justify-center gap-x-2">
                        {user.user_metadata?.avatar_url && (
                            <div className="relative w-5 h-5">
                                <Image
                                    src={user.user_metadata.avatar_url}
                                    alt={`${user.user_metadata?.user_name} Profile Picture`}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                        )}
                        <span className="font-mono">
                            {user.user_metadata?.['user_name']}
                        </span>
                    </div>
                ) : (
                    <div className="flex justify-center gap-x-2">
                        <span className="font-mono">Login</span>
                        <FaRightToBracket className="!size-4" />
                    </div>
                )}
            </Button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="flex flex-col justify-center gap-x-2 gap-y-1 absolute top-full left-0 right-0 mt-1 w-full"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0, transition: { duration: 0.1 } }}
                    >
                        {create && (
                            <Button
                                variant="outline"
                                className="font-mono w-full text-sm"
                                onClick={handleCreate}
                            >
                                <span>create</span>
                                <FaPlus className="!size-3" />
                            </Button>
                        )}

                        {logout && (
                            <Button
                                variant="outline"
                                className="font-mono w-full text-sm"
                                onClick={handleSignOut}
                            >
                                <span>logout</span>
                                <FaRightFromBracket className="!size-3" />
                            </Button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
