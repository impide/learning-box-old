-- Deploy formation:constraint to pg

BEGIN;

-- ADMIN & TEACHER ROLE
CREATE DOMAIN "admin_Role" AS INTEGER 
CHECK (value > 0 AND value <= 2);

-- USER ROLE
CREATE DOMAIN "user_Role" AS INTEGER 
CHECK (value = 0);

-- POSITIVE NOTE & PRICE
CREATE DOMAIN "posint" AS NUMERIC 
CHECK (value > 0);

ALTER TABLE "teacher"
    ALTER COLUMN "role" TYPE "admin_Role";

ALTER TABLE "user"
    ALTER COLUMN "role" TYPE "user_Role";

ALTER TABLE "course"
    ALTER COLUMN "price" TYPE "posint";

COMMIT;
