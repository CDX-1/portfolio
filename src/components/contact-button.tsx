import { Button } from '@/components/ui/button';
import { FaPaperPlane } from 'react-icons/fa6';

export default function ContactButton() {
    return (
        <Button
            variant="link"
            className="flex items-center hover:text-accent-foreground hover:no-underline"
        >
            <span>Contact Me</span>
            <FaPaperPlane />
        </Button>
    );
}
