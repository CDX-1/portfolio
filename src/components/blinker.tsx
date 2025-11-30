import { motion } from "motion/react";

export function Blinker() {
    return (
        <motion.span
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeInOut' }}
            className="ml-2 font-black text-accent"
        >
            <motion.span
                style={{ display: 'inline-block' }}
                animate={
                    {
                        y: [0, -2, 0],
                        transition: {
                            duration: 0.6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        },
                    } as any
                }
            >
                _
            </motion.span>
        </motion.span>
    );
}