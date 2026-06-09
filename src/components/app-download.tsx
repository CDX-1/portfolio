import { IconDownloadFilled } from '@tabler/icons-react';
// @ts-expect-error
import StoreBadge from 'react-store-badge';

export function AppDownload({ appStore, playStore, metric }: { appStore: string; playStore: string; metric?: string }) {
    return (
        <section className="w-full max-w-2xl mx-auto px-4 py-12">
            <div className="text-center">
                <div className="space-y-2 mb-8">
                    <h2 className="text-2xl md:text-3xl font-semibold font-bespoke tracking-tight text-foreground">
                        Try it out yourself!
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Available on your favourite platforms
                    </p>
                    {metric && (
                        <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-muted/50 border border-border/40 px-4 py-1.5 text-sm text-foreground">
                            <IconDownloadFilled className="size-4" />
                            <span className="font-medium">{metric}+</span>
                            <span className="text-muted-foreground">downloads</span>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                    {appStore && (
                        <div>
                            <StoreBadge
                                name="BetterTeachAssist"
                                appStoreUrl={appStore}
                            />
                        </div>
                    )}

                    {playStore && (
                        <div>
                            <StoreBadge
                                name="BetterTeachAssist"
                                googlePlayUrl={playStore}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}