-- Letters move to an all-orange paper palette.
-- Step 1 of 2: accept both the old and new colour names so the currently
-- deployed site (old names) and the new site (new names) can both insert
-- while the deploy rolls out.

alter table public.notes drop constraint if exists notes_color_values;
alter table public.notes
    add constraint notes_color_values check (
        color in (
            'cream', 'sky', 'sage', 'rose', 'butter',
            'peach', 'apricot', 'tangerine', 'amber', 'clay'
        )
    );
