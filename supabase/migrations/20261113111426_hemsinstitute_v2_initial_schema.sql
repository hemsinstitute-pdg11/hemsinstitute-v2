-- Hem's Institute V2 initial PostgreSQL schema.
-- All tables are accessed by the trusted Next.js server through DATABASE_URL.
-- No direct anon/authenticated Data API access is granted.

create table public.program_categories (
  id uuid primary key,
  name varchar(100) not null,
  slug varchar(100) not null unique,
  description text,
  created_at timestamptz not null default now()
);
create index program_categories_name_idx on public.program_categories(name);

create table public.programs (
  id uuid primary key,
  category_id uuid not null references public.program_categories(id) on delete restrict,
  name varchar(150) not null,
  slug varchar(150) not null unique,
  description text not null,
  target_audience varchar(100) not null,
  course_level varchar(50) not null,
  duration varchar(100) not null,
  total_meetings integer,
  price numeric,
  learning_method varchar(100),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint programs_total_meetings_nonnegative check (total_meetings is null or total_meetings >= 0),
  constraint programs_price_nonnegative check (price is null or price >= 0)
);
create index programs_category_id_idx on public.programs(category_id);
create index programs_is_active_idx on public.programs(is_active);

create table public.course_schedules (
  id uuid primary key,
  program_id uuid not null references public.programs(id) on delete cascade,
  day varchar(50) not null,
  start_time time not null,
  end_time time not null,
  learning_method varchar(100) not null,
  capacity integer not null default 1,
  is_active boolean not null default true,
  constraint course_schedules_capacity_nonnegative check (capacity >= 0),
  constraint course_schedules_time_order check (end_time > start_time)
);
create index course_schedules_program_id_idx on public.course_schedules(program_id);
create index course_schedules_is_active_idx on public.course_schedules(is_active);

create table public.participants (
  id uuid primary key,
  full_name varchar(150) not null,
  phone varchar(30) not null,
  email varchar(150),
  birth_date date,
  education_level varchar(50) not null,
  school_name varchar(150),
  guardian_name varchar(150),
  guardian_phone varchar(30),
  created_at timestamptz not null default now()
);
create index participants_phone_idx on public.participants(phone);

create table public.registrations (
  id uuid primary key,
  registration_code varchar(30) not null unique,
  participant_id uuid not null references public.participants(id) on delete cascade,
  program_id uuid not null references public.programs(id) on delete restrict,
  schedule_id uuid references public.course_schedules(id) on delete set null,
  status varchar(30) not null default 'new',
  learning_method varchar(100) not null,
  consent_at timestamptz,
  created_at timestamptz not null default now()
);
create index registrations_program_id_idx on public.registrations(program_id);
create index registrations_participant_id_idx on public.registrations(participant_id);
create index registrations_schedule_id_idx on public.registrations(schedule_id);
create index registrations_status_idx on public.registrations(status);
create index registrations_created_at_idx on public.registrations(created_at);

create table public.registration_logs (
  id uuid primary key,
  registration_id uuid not null references public.registrations(id) on delete cascade,
  status varchar(30) not null,
  notes text,
  created_at timestamptz not null default now()
);
create index registration_logs_registration_id_idx on public.registration_logs(registration_id);
create index registration_logs_created_at_idx on public.registration_logs(created_at);

alter table public.program_categories enable row level security;
alter table public.programs enable row level security;
alter table public.course_schedules enable row level security;
alter table public.participants enable row level security;
alter table public.registrations enable row level security;
alter table public.registration_logs enable row level security;

revoke all on table public.program_categories, public.programs, public.course_schedules,
  public.participants, public.registrations, public.registration_logs
from anon, authenticated;
