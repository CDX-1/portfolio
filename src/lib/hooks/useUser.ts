'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export function useUser() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const supabase = createClient();
        let ignore = false;

        const load = async () => {
            const { data } = await supabase.auth.getUser();
            if (!ignore) {
                setUser(data.user ?? null);
            }
        };

        load();

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        return () => {
            ignore = true;
            listener.subscription.unsubscribe();
        };
    }, []);

    return user;
}
