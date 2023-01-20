-- Deploy formation:functions to pg

BEGIN;

-- Insert User
CREATE FUNCTION "insert_user"(json) RETURNS "user" AS $$

    INSERT INTO "user"
        ("email", "pseudo", "password", "avatar", "role") VALUES
        (
            $1->>'email',
            $1->>'pseudo',
            $1->>'password',
            $1->>'avatar',
            ($1->>'role')::int
        ) RETURNING *

$$ LANGUAGE sql;

-- Insert Course
CREATE FUNCTION "insert_course"(json) RETURNS "course" AS $$

    INSERT INTO "course"
        ("label", "course_description", "author", "language", "price", "video", "PDF", "teacher_id", "category_id") VALUES
        (
            $1->>'label',
            $1->>'course_description',
            $1->>'author',
            $1->>'language',
            ($1->>'price')::numeric(4,2),
            $1->>'video',
            $1->>'PDF',
            ($1->>'teacher_id')::int,
            ($1->>'category_id')::int
        ) RETURNING *

$$ LANGUAGE sql;


-- Insert Course to Favorite
CREATE FUNCTION "insert_to_favorite"(json) RETURNS "be_favorite" AS $$

    INSERT INTO "be_favorite"
        ("user_id", "course_id") VALUES
        (
            ($1->>'user_id')::int,
            ($1->>'course_id')::int
        ) RETURNING *

$$ LANGUAGE sql;


-- Insert Category
CREATE FUNCTION "insert_category"(json) RETURNS "category" AS $$

    INSERT INTO "category"
        ("title", "description", "parent") VALUES
        (
            $1->>'title',
            $1->>'description',
            ($1->>'parent')::int
        ) RETURNING *

$$ LANGUAGE sql;

-- Update Category
CREATE FUNCTION "update_category"(json) RETURNS "category" AS $$

    UPDATE "category" SET
        "title" = $1->>'title',
        "description" = $1->>'description'
    WHERE "id" = ($1->>'id')::int

    RETURNING *

$$ LANGUAGE sql;

-- Update User
CREATE FUNCTION "update_user"(json) RETURNS "user" AS $$

    UPDATE "user" SET
        "email" = $1->>'email',
        "pseudo" = $1->>'pseudo',
        "password" = $1->>'password',
        "avatar" = $1->>'avatar',
        "role" = ($1->>'role')::int
    WHERE "id" = ($1->>'id')::int

    RETURNING *

$$ LANGUAGE sql;

-- Update Teacher
CREATE FUNCTION "update_teacher"(json) RETURNS "teacher" AS $$

    UPDATE "teacher" SET
        "email" = $1->>'email',
        "pseudo" = $1->>'pseudo',
        "password" = $1->>'password',
        "avatar" = $1->>'avatar',
        "role" = ($1->>'role')::int
    WHERE "id" = ($1->>'id')::int

    RETURNING *

$$ LANGUAGE sql;

-- Update Teacher Course
CREATE FUNCTION "update_teacher_course"(json) RETURNS "course" AS $$

    UPDATE "course" SET
        "label" = $1->>'label',
        "course_description" = $1->>'course_description',
        "language" = $1->>'language',
        "price" = ($1->>'price')::numeric(4,2),
        "video" = $1->>'video',
        "PDF" = $1->>'PDF'
    WHERE "id" = ($1->>'id')::int
    RETURNING*

$$ LANGUAGE sql STRICT;

--Todo : update a comment
CREATE FUNCTION "update_comment_note"(json) RETURNS "course" AS $$

    UPDATE "course" SET 
           "label" = $1->>'label',
           "course_description" = $1->>'course_description',
           "author" = $1->>'author',
           "language" = $1->>'language',
            "note" = ($1->>'note')::jsonb,
            "comment" = ($1->>'comment')::jsonb,
            "price" = ($1->>'price')::numeric(4,2),
            "video" = $1->>'video',
            "PDF" = $1->>'PDF',
            "teacher_id" = ($1->>'teacher_id')::int,
            "category_id" = ($1->>'category_id')::int
    WHERE "id" = ($1->>'id')::int
    RETURNING *

$$ LANGUAGE sql;


-- TODO Insert a comment 
CREATE FUNCTION "insert_comment"(json) RETURNS "course" AS $$

    INSERT INTO "course" 
    ("label", "course_description", "author", "language", "note", "comment", "price", "video", "PDF", "teacher_id", "category_id") VALUES
    (
       $1->>'label',
       $1->>'course_description',
       $1->>'author',
       $1->>'language',
        ($1->>'note')::jsonb,
        ($1->>'comment')::jsonb,
       ($1->>'price')::numeric(4,2),
       $1->>'video',
       $1->>'PDF',
       ($1->>'teacher_id')::int,
       ($1->>'category_id')::int
        ) RETURNING *
    
$$ LANGUAGE sql STRICT;



COMMIT;
