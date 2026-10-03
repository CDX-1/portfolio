-- Keep rate-limit data private to server code and persist optional note doodles.
alter table public.notes
    add column if not exists ip_hash text,
    add column if not exists doodle jsonb;

do $$
begin
    if not exists (
        select 1 from pg_constraint where conname = 'notes_ip_hash_format'
    ) then
        alter table public.notes add constraint notes_ip_hash_format
            check (ip_hash is null or ip_hash ~ '^[0-9a-f]{64}$');
    end if;

    if not exists (
        select 1 from pg_constraint where conname = 'notes_doodle_is_array'
    ) then
        alter table public.notes add constraint notes_doodle_is_array
            check (doodle is null or jsonb_typeof(doodle) = 'array');
    end if;
end $$;

create index if not exists notes_ip_hash_created_idx
    on public.notes (ip_hash, created_at desc)
    where ip_hash is not null;

-- Public notes are created through the rate-limited server route, not directly
-- through the Data API. Keep client grants to the minimum each UI flow needs.
revoke all on table public.notes from anon, authenticated;
grant select on table public.notes to anon, authenticated;
grant update, delete on table public.notes to authenticated;

drop policy if exists "notes read approved" on public.notes;
create policy "notes read approved"
    on public.notes
    for select
    to anon, authenticated
    using (status = 'approved');

drop policy if exists "notes owner reads all" on public.notes;
create policy "notes owner reads all"
    on public.notes
    for select
    to authenticated
    using ((select auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com');

drop policy if exists "notes public insert pending" on public.notes;

drop policy if exists "notes owner update" on public.notes;
create policy "notes owner update"
    on public.notes
    for update
    to authenticated
    using ((select auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com')
    with check ((select auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com');

drop policy if exists "notes owner delete" on public.notes;
create policy "notes owner delete"
    on public.notes
    for delete
    to authenticated
    using ((select auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com');
