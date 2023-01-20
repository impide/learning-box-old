-- Verify formation:structure on pg

BEGIN;

SELECT id FROM "teacher" WHERE false;

SELECT id FROM "user" WHERE false;

SELECT id FROM "course" WHERE false;

SELECT id FROM "category" WHERE false;

ROLLBACK;
