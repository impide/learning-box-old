-- Revert formation:constraint from pg

BEGIN;

ALTER TABLE "user"
    ALTER COLUMN "role" TYPE INTEGER;

ALTER TABLE "teacher"
    ALTER COLUMN "role" TYPE INTEGER;
    
ALTER TABLE "course"
    ALTER COLUMN "price" TYPE NUMERIC;

DROP DOMAIN "user_Role", "admin_Role", "posint";

COMMIT;
