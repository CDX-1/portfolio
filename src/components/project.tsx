import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa6';

interface ProjectProps {
    title: string;
    description: string;
    image: string;
}

export const Project = ({ title, description, image }: ProjectProps) => {
    return (
        <div className="flex justify-between gap-x-10 border-2 border-foreground/10 rounded-lg p-6 hover:cursor-pointer hover:bg-foreground/5 transition-colors">
            <div className="flex flex-col justify-between max-w-2/5 p-2">
                <div className="flex flex-col space-y-4 ">
                    <h1 className="font-bold text-2xl text-accent">{title}</h1>
                    <p className="font-mono">{description}</p>
                </div>

                <div className="font-mono">
                    <Button variant="link">
                        <FaGithub />
                        <span>github</span>
                    </Button>
                </div>
            </div>

            <Image
                src={image}
                alt={`${title} image`}
                width={1920}
                height={1080}
                className="max-w-3/5 rounded-lg object-cover"
            />
        </div>
    );
};
