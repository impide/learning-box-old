-- Deploy formation:view to pg

BEGIN;

CREATE VIEW "users_with_course_and_category" AS
SELECT 
    "user"."id", "email", "pseudo", "password", "avatar", "role" , 
    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('label', "label", 'course_description', "course_description", 'author', "author", 'language', "language", 'note', "note", 'price', "price", 'comment', "comment", 'video', "video", 'pdf', "PDF", 'category_title', "title", 'category_description', "category"."description"))
	FILTER (WHERE "label" IS NOT NULL), '[]') AS "courses"
FROM 
    "user"
LEFT OUTER JOIN 
    "be_favorite" ON "user"."id" = "be_favorite"."user_id"
LEFT OUTER JOIN  
    "course" ON "be_favorite"."course_id" = "course"."id"
LEFT OUTER JOIN  
    "category" ON "course"."category_id" = "category"."id"
GROUP BY 
    "user"."id", "email", "pseudo", "password", "avatar", "role";


CREATE VIEW "teachers_with_course_and_category" AS
SELECT 
    "teacher"."id","email","pseudo","avatar","role",
    COALESCE(JSON_AGG(JSON_BUILD_OBJECT('id',"course"."id",'label', "label", 'course_description', "course_description", 'author', "author", 'language', "language", 'note', "note", 'price', "price", 'comment', "comment", 'video', "video", 'PDF', "PDF", 'category_title', "title", 'category_description', "category"."description"))
    FILTER(WHERE "label" IS NOT NULL), '[]') AS "courses"
FROM 
    "teacher"
LEFT OUTER JOIN 
    "course" ON "course"."teacher_id" = "teacher"."id"
LEFT OUTER JOIN 
    "category" ON "course"."category_id" = "category"."id"
GROUP BY 
    "teacher"."id","email","pseudo","avatar","role";


CREATE VIEW "course_with_category" AS
SELECT 
    "course"."id", "label", "course_description", "author", "language", "note", "price", "comment", "video", "PDF",
    "category"."title" AS "category_title", "category"."description" AS "category_description"
FROM 
    "course"
JOIN 
    "category" ON "course"."category_id" = "category"."id"
ORDER BY 
    "id";


CREATE VIEW "category_with_sub_category" AS
SELECT 
    "description", JSON_AGG(JSON_BUILD_ARRAY("title", "description", "parent"))
FROM 
    "category"
GROUP BY 
    "description"
ORDER BY 
    "description";

COMMIT;
