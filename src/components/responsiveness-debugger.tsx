export default function ResponsivenessDebugger() {
    return (
        <div className="fixed bottom-0 left-0 right-0 w-full bg-foreground/10">
            <div className="w-full h-full sm:bg-red-500 md:bg-green-500 lg:bg-blue-500 2xl:bg-yellow-500 3xl:bg-pink-500" />
            <div className="text-sm font-bold flex gap-2 items-center">
                <p className="hidden xs:block">xs</p>
                <p className="hidden sm:block">sm</p>
                <p className="hidden md:block">md</p>
                <p className="hidden lg:block">lg</p>
                <p className="hidden xl:block">xl</p>
                <p className="hidden 2xl:block">2xl</p>
                <p className="hidden 3xl:block">3xl</p>
            </div>
        </div>
    );
}