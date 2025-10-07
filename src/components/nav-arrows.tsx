'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { FaArrowDown } from 'react-icons/fa';
import { FaArrowUp } from 'react-icons/fa6';

export function DownArrow() {
    const { scrollYProgress } = useScroll();

    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    const scroll = () => {
        const nextY = window.scrollY + window.innerHeight;
        window.scrollTo({ top: nextY, behavior: 'smooth' });
    };

    return (
        <motion.div
            role="button"
            className="fixed bottom-40 left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={scroll}
            style={{ opacity }}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <FaArrowDown size={40} />
            </motion.div>
        </motion.div>
    );
}

export function UpArrow() {
    const { scrollYProgress } = useScroll();

    const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    const scroll = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <motion.div
            role="button"
            className="fixed bottom-20 right-20 -translate-x-1/2 cursor-pointer"
            onClick={scroll}
            style={{ opacity }}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            >
                <FaArrowUp size={40} />
            </motion.div>
        </motion.div>
    );
}
