-- Add migration script here
create table if not exists todos (
    id serial primary key,
    title varchar(255) not null,
    completed boolean not null default false
);