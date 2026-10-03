create table if not exists public.shenanigans (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    entry_date date not null,
    title text not null,
    caption text,
    media_kind text not null,
    media_src text not null,
    media_poster text,
    media_alt text,
    media_aspect text,
    span text not null default 'half',
    position integer not null default 0,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint shenanigans_slug_length check (char_length(slug) between 1 and 80),
    constraint shenanigans_title_length check (char_length(title) between 1 and 160),
    constraint shenanigans_media_kind_values check (media_kind in ('image', 'gif', 'video')),
    constraint shenanigans_media_aspect_values check (
        media_aspect is null or media_aspect in ('video', 'square', 'portrait', 'wide', 'tall')
    ),
    constraint shenanigans_span_values check (span in ('half', 'full'))
);

create index if not exists shenanigans_display_idx
    on public.shenanigans (position desc, entry_date desc, created_at desc);

alter table public.shenanigans enable row level security;
revoke all on table public.shenanigans from anon, authenticated;
grant select on table public.shenanigans to anon, authenticated;
grant delete on table public.shenanigans to authenticated;

drop policy if exists "shenanigans public read" on public.shenanigans;
create policy "shenanigans public read"
    on public.shenanigans
    for select
    to anon, authenticated
    using (true);

drop policy if exists "shenanigans owner delete" on public.shenanigans;
create policy "shenanigans owner delete"
    on public.shenanigans
    for delete
    to authenticated
    using ((select auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com');

insert into storage.buckets (id, name, public)
values ('shenanigans', 'shenanigans', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "shenanigans owner upload" on storage.objects;
create policy "shenanigans owner upload"
    on storage.objects
    for insert
    to authenticated
    with check (
        bucket_id = 'shenanigans'
        and (select auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com'
    );

drop policy if exists "shenanigans owner delete upload" on storage.objects;
create policy "shenanigans owner delete upload"
    on storage.objects
    for delete
    to authenticated
    using (
        bucket_id = 'shenanigans'
        and (select auth.jwt() ->> 'email') = 'cdxlol.dev@gmail.com'
    );
