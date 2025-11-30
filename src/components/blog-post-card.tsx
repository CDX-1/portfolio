import Image from 'next/image';

interface BlogPostCardProps {
    title: string;
    description: string;
    date: Date;
    keywords?: string[];
    author: {
        name: string;
        avatarUrl: string;
    };
}

export const BlogPostCard = ({
    title,
    description,
    date,
    keywords,
    author,
}: BlogPostCardProps) => {
    return (
        <div className="flex flex-col space-y-2 group hover:cursor-pointer hover:scale-105 transition-transform duration-100">
            <h3 className="font-bold text-2xl group-hover:text-accent transition-colors duration-100">
                {title}
            </h3>
            <div className="flex items-center mb-2 space-x-2 font-mono text-sm text-muted-foreground/80 group-hover:text-muted-foreground transition-colors duration-100">
                <p>
                    {date.toDateString()}{' '}
                    <span className="text-accent-foreground">—</span> Published
                    by <span className="font-semibold">{author.name}</span>
                </p>

                <Image
                    src={author.avatarUrl}
                    alt={`${author.name} avatar`}
                    width={24}
                    height={24}
                    className="rounded-full mr-2"
                />
            </div>
            <p className="font-mono text-foreground/80 group-hover:text-foreground transition-colors duration-100">
                {description}
            </p>
            <div className="flex items-center space-x-2">
                {keywords?.map((keyword, i) => {
                    const bg = [
                        'bg-chart-1/20',
                        'bg-chart-2/20',
                        'bg-chart-3/20',
                        'bg-chart-4/20',
                        'bg-chart-5/20',
                    ][i % 5];

                    return (
                        <span
                            key={keyword}
                            className={`inline-block ${bg} text-accent text-xs font-mono px-2 py-1 rounded-full mt-2 mr-2`}
                        >
                            {keyword.toLowerCase()}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};
