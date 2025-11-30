'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';

export const Header = ({ children }: { children: ReactNode }) => {
    return (
        <motion.h1
            className="font-mono font-bold text-3xl flex items-center space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {children}
        </motion.h1>
    );
};
