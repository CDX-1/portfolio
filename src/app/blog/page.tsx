import { Header } from '@/components/header';
import { FaMessage, FaRightToBracket } from 'react-icons/fa6';
import { BlogPostCard } from '@/components/blog-post-card';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
    return (
        <div className="w-11/12 md:w-2/5 mt-24 md:mt-40 mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <Header>
                    <FaMessage className="text-accent" />
                    <span>Blog</span>
                </Header>

                <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center font-semibold space-x-1"
                >
                    <span className="font-mono">Login</span>
                    <FaRightToBracket className="!size-4" />
                </Button>
            </div>

            <BlogPostCard
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                description="Vivamus sagittis eget erat ac scelerisque. Quisque nunc velit, interdum vitae dapibus at, ornare in nulla."
                date={new Date()}
                keywords={['react', 'typescript', 'go', 'supabase']}
                author={{
                    name: 'CDX',
                    avatarUrl:
                        'https://images.unsplash.com/photo-1763908161084-6be74390daf2?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
            />

            <BlogPostCard
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                description="Vivamus sagittis eget erat ac scelerisque. Quisque nunc velit, interdum vitae dapibus at, ornare in nulla."
                date={new Date()}
                keywords={['react', 'typescript', 'go', 'supabase']}
                author={{
                    name: 'CDX',
                    avatarUrl:
                        'https://images.unsplash.com/photo-1763908161084-6be74390daf2?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
            />

            <BlogPostCard
                title="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                description="Vivamus sagittis eget erat ac scelerisque. Quisque nunc velit, interdum vitae dapibus at, ornare in nulla."
                date={new Date()}
                keywords={['react', 'typescript', 'go', 'supabase']}
                author={{
                    name: 'CDX',
                    avatarUrl:
                        'https://images.unsplash.com/photo-1763908161084-6be74390daf2?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                }}
            />
        </div>
    );
}
