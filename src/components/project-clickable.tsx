import Link from "next/link";
import PhotoFolder, { FolderColour } from "./photo-folder";

interface ProjectMeta {
    name: string;
    description: string;
    images: string[];
    color: FolderColour;
    slug: string;
}

export default function ProjectClickable({ name, description, images, color, slug }: ProjectMeta) {
    return (
        <div className="flex flex-col">
            <div className="mx-auto w-full max-w-sm aspect-square p-12 flex items-center justify-center bg-linear-to-b from-gray-200/50 to-gray-300/70 rounded-4xl">
                <Link href={`/projects/${slug}`}>
                    <PhotoFolder className="drop-shadow-2xl" color={color} images={images} />
                </Link>
            </div>
            <div className="mt-4 ml-4">
                <h3 className="font-bespoke font-medium text-2xl tracking-tight">{name}</h3>
                <p className="font-satoshi text-lg tracking-tight text-foreground/70">{description}</p>
            </div>
        </div>
    );
}   