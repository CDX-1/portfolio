export default function Navbar() {
    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 w-max bg-accent/80 backdrop-blur-md p-1.5 rounded-full border border-border/50 shadow-xs">
            <a href="#" className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full transition-colors hover:bg-primary/90">
                Home
            </a>

            <a href="#" className="px-4 py-1.5 text-foreground hover:bg-muted text-sm font-medium rounded-full transition-colors">
                About Me
            </a>
        </nav>
    );
}