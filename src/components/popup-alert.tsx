import { ReactNode } from 'react';
import { Alert } from '@/components/ui/alert';
import { AnimatePresence, motion } from 'motion/react';

interface PopupAlertProps {
    children: ReactNode;
    variant?: "default" | "destructive";
    open?: boolean;
}

export const PopupAlert = ({ children, variant = "default", open = false }: PopupAlertProps) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="absolute top-15 flex justify-center w-full z-50"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <Alert className="w-1/5 drop-shadow-md" variant={variant}>
                        {children}
                    </Alert>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
