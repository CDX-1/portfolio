import { DownArrow, UpArrow } from './nav-arrows';

export default function Hero() {
    return (
        <div className="flex items-center justify-center h-screen space-y-20">
            <div className="flex-col text-center">
                <h1 className="font-semibold text-9xl">CDX</h1>
                <p>16 year old • Canadian Developer</p>
            </div>

            <DownArrow />
            <UpArrow />
        </div>
    );
}
