-- Profiles (extended user data)
create table profiles (
id uuid references auth.users on delete cascade primary key,
display_name text,
username text unique,
avatar_url text,
bio text,
created_at timestamp with time zone default now()
);


-- Recipes
create table recipes (
id uuid primary key default gen_random_uuid(),
user_id uuid references profiles(id) on delete cascade,
title text not null,
slug text unique not null,
description text,
ingredients jsonb,
steps jsonb,
prep_time int,
cook_time int,
servings int,
category text,
cover_url text,
is_public boolean default true,
created_at timestamp with time zone default now(),
updated_at timestamp with time zone default now()
);


-- Recipe Images (opsional)
create table recipe_images (
id uuid primary key default gen_random_uuid(),
recipe_id uuid references recipes(id) on delete cascade,
url text not null,
ordering int default 0
);


-- Comments
create table comments (
id uuid primary key default gen_random_uuid(),
recipe_id uuid references recipes(id) on delete cascade,
user_id uuid references profiles(id) on delete cascade,
content text not null,
parent_id uuid references comments(id) on delete cascade,
created_at timestamp with time zone default now()
);


-- Ratings
create table ratings (
id uuid primary key default gen_random_uuid(),
recipe_id uuid references recipes(id) on delete cascade,
user_id uuid references profiles(id) on delete cascade,
rating int check (rating >= 1 and rating <= 5),
created_at timestamp with time zone default now(),
unique (recipe_id, user_id)
);


-- Bookmarks
create table bookmarks (
id uuid primary key default gen_random_uuid(),
user_id uuid references profiles(id) on delete cascade,
recipe_id uuid references recipes(id) on delete cascade,
created_at timestamp with time zone default now(),
unique (user_id, recipe_id)
);


-- Tags (opsional)
create table tags (
id uuid primary key default gen_random_uuid(),
name text unique not null
);


-- Recipe Tags (many-to-many)
create table recipe_tags (
recipe_id uuid references recipes(id) on delete cascade,
tag_id uuid references tags(id) on delete cascade,
primary key (recipe_id, tag_id)
);