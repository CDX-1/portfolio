-- Letters move to an all-orange paper palette.
-- Step 2 of 2 (run once the new site is deployed): remap existing rows to the
-- new names, then only allow the new names going forward.

update public.notes
set color = case color
    when 'cream' then 'peach'
    when 'sage' then 'apricot'
    when 'sky' then 'tangerine'
    when 'butter' then 'amber'
    when 'rose' then 'clay'
end
where color in ('cream', 'sage', 'sky', 'butter', 'rose');

alter table public.notes alter column color set default 'peach';

alter table public.notes drop constraint if exists notes_color_values;
alter table public.notes
    add constraint notes_color_values check (
        color in ('peach', 'apricot', 'tangerine', 'amber', 'clay')
    );
