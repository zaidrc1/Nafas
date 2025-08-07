
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  text text not null check (char_length(text) <= 2000),
  recipient text,
  created_at timestamptz not null default now(),
  deleted boolean not null default false,
  ip_hash text
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);
create index if not exists messages_recipient_idx on public.messages (lower(recipient));
