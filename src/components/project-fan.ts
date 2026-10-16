/**
 * Where the nth extra image sits when a project mockup fans out on hover.
 * Images alternate sides working outward (-1, +1, -2, +2, ...) so the
 * spread stays symmetric, and outer items sit lower, smaller and more tilted.
 *
 * With an odd number of extras that pattern leaves one side heavier, so the
 * row is rebalanced around the centre instead:
 * - `mainInRow` (the main item is part of the fan): the main item moves half a
 *   slot right (see `fanMainSlot`) and the extras fill -0.5, +1.5, -1.5, ...
 * - otherwise (the main item sits in front): the first extra takes the centre
 *   slot behind it and the rest alternate outward from there.
 */
export function fanSlot(index: number, count: number, mainInRow = true) {
    if (count % 2 === 0) {
        const side = index % 2 === 0 ? -1 : 1;
        const ring = Math.floor(index / 2) + 1;
        return { slot: side * ring, ring };
    }

    if (index === 0) return { slot: mainInRow ? -0.5 : 0, ring: 1 };

    const j = index - 1;
    const ring = Math.floor(j / 2) + 2;
    if (mainInRow) {
        const side = j % 2 === 0 ? 1 : -1;
        return { slot: side * (ring - 0.5), ring };
    }
    const side = j % 2 === 0 ? -1 : 1;
    return { slot: side * (ring - 1), ring };
}

/** Where the main item sits in a fan that it's part of (see `fanSlot`). */
export function fanMainSlot(count: number) {
    return count % 2 === 0 ? 0 : 0.5;
}

/** How much a hovered item rises above the fan when it's held open. */
export const LIFT = { scale: 0.1, y: 5 } as const;
