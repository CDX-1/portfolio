import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-2">
            <div className="flex flex-col text-center space-y-1">
                <h1 className="text-9xl">404</h1>
                <div className="h-0.5 w-full bg-foreground my-2" />
                <p className="text-xl">Page Not Found</p>
            </div>
            <Link className="text-sm underline" href="/">
                Return to home page?
            </Link>
        </div>
    );
}
