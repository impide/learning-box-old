-- Revert formation:functions from pg

BEGIN;

DROP FUNCTION "update_comment_note"(json);

DROP FUNCTION "update_teacher_course"(json);

DROP FUNCTION "update_teacher"(json);

DROP FUNCTION "update_user"(json);

DROP FUNCTION "update_category"(json);

DROP FUNCTION "insert_category"(json);

DROP FUNCTION "insert_to_favorite"(json);

DROP FUNCTION "insert_course"(json);

DROP FUNCTION "insert_user"(json);

COMMIT;
