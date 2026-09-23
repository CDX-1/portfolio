-- Notes: public guestbook with owner moderation
-- Public can insert (as 'pending') and read only approved rows.
-- Owner (email match) can read all and update/delete.

create table if not exists public.notes (
    id uuid primary key default gen_random_uuid(),
    sender_name text not null,
    message text not null,
    color text not null default 'cream',
    status text not null default 'pending',
    created_at timestamptz not null default now(),
    approved_at timestamptz,
    constraint notes_sender_name_len
        check (char_length(sender_name) between 1 and 40),
    constraint notes_message_len
        check (char_length(message) between 1 and 500),
    constraint notes_status_values
        check (status in ('pending', 'approved', 'rejected')),
    constraint notes_color_values
        check (color in ('cream', 'sky', 'sage', 'rose', 'butter'))
);

create index if not exists notes_status_created_idx
    on public.notes (status, created_at desc);

alter table public.notes enable row level security;

-- Anyone can read approved notes.
drop policy if exists "notes read approved" on public.notes;
create policy "notes read approved"
    on public.notes
    for select
    using (status = 'approved');

-- Owner reads everything (including pending/rejected).
drop policy if exists "notes owner reads all" on public.notes;
create policy "notes owner reads all"
    on public.notes
    for select
    using ((auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com');

-- Anyone (anon or authed) can insert a pending note.
drop policy if exists "notes public insert pending" on public.notes;
create policy "notes public insert pending"
    on public.notes
    for insert
    with check (status = 'pending');

-- Owner can update (approve/reject).
drop policy if exists "notes owner update" on public.notes;
create policy "notes owner update"
    on public.notes
    for update
    using ((auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com')
    with check ((auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com');

-- Owner can delete.
drop policy if exists "notes owner delete" on public.notes;
create policy "notes owner delete"
    on public.notes
    for delete
    using ((auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com');
