-- Revert formation:view from pg

BEGIN;

DROP VIEW "category_with_sub_category";

DROP VIEW "course_with_category";

DROP VIEW "teachers_with_course_and_category";

DROP VIEW "users_with_course_and_category";

COMMIT;
