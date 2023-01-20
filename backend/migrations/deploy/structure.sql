-- Deploy formation:structure to pg

BEGIN;

CREATE DOMAIN "email" AS text
CHECK (
    value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
);

CREATE TABLE "teacher"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" EMAIL NOT NULL UNIQUE,
    "pseudo" TEXT NOT NULL,
    "password" TEXT	NOT NULL,
    "avatar" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "user"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email"	EMAIL NOT NULL UNIQUE,
    "pseudo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "role" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ	
);

CREATE TABLE "category"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "parent" INT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "course"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "label"	TEXT NOT NULL UNIQUE,
    "course_description" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "language" TEXT DEFAULT 'Français',
    "note" JSONB,
    "comment" JSONB,
    "price" NUMERIC	NOT NULL,
    "video" TEXT NOT NULL,
    "PDF" TEXT NOT NULL,
    "teacher_id" INTEGER NOT NULL REFERENCES "teacher"("id"),
    "category_id" INTEGER NOT NULL REFERENCES "category"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "be_favorite"(
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "course_id" INTEGER	NOT NULL REFERENCES "course"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


COMMIT;
