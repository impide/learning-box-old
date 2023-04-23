-- Revert formation:structure from pg

BEGIN;

DROP TABLE IF EXISTS "be_favorite", "category", "course", "user", "teacher" CASCADE;

DROP DOMAIN "email"; 

COMMIT;
