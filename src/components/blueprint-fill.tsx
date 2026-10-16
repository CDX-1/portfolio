/**
 * Orange blueprint grid that floods a `group` button from the bottom up on
 * hover/focus. Put it first inside a `relative overflow-hidden` element and
 * lift the button's content above it with `relative`.
 */
export default function BlueprintFill() {
    return (
        <span
            aria-hidden
            className="blueprint-grid pointer-events-none absolute inset-0 [background-size:32px_32px,32px_32px,8px_8px,8px_8px] [clip-path:inset(100%_0_0_0)] transition-[clip-path] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[clip-path:inset(0_0_0_0)] group-focus-visible:[clip-path:inset(0_0_0_0)]"
        />
    );
}
