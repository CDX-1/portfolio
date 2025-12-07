'use client';

import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa6';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/lib/hooks/useUser';
import { redirect } from 'next/navigation';

export default function LoginPage() {
    const user = useUser();
    if (user) return redirect("/blog");
    const supabase = createClient();

    const login = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:3000/auth/callback'
            }
        });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 font-mono space-y-2">
            <h1 className="text-xl font-bold text-accent">/login</h1>
            <div className="flex flex-col bg-card dark:bg-primary-foreground items-center py-6 px-4 rounded-xl w-full max-w-sm space-y-6 text-center">
                <p className="text-foreground/70">
                    Login to the blog using your GitHub account
                </p>

                <Button
                    variant="outline"
                    className="w-3/5 h-14 font-bold text-2xl flex items-center justify-center space-x-3"
                    onClick={login}
                >
                    <FaGithub className="size-7" />
                    <span>GitHub</span>
                </Button>
            </div>
        </div>
    );
}
