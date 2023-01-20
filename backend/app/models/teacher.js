import client from '../helpers/connectToDatabase.js';

export default {
    // Find all Teachers join with Course and Category Order By Id
    async findAllTeachersJoin() {
        const result = await client.query('SELECT * FROM "teachers_with_course_and_category" ORDER BY "id"');
        return result.rows;
    },

    // Find one Teacher by Teacher_Id
    async findOneTeacherByTeacherId(teacherId) {
        const result = await client.query('SELECT * FROM "teacher" WHERE "id" = $1', [teacherId]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find one Teacher by Email join with
    async findOneTeacherJoinByEmail(email) {
        const result = await client.query('SELECT * FROM "teacher" WHERE "email" = $1', [email]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find all Courses by Teacher_Id
    async findAllCoursesByTeacherId(teacherId) {
        const result = await client.query('SELECT "id" FROM "course" WHERE "teacher_id" = $1', [teacherId]);
        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find one Course by Teacher_Id & Course_Id
    async findOneCourseByIds(teacherId, courseId) {
        const result = await client.query('SELECT * FROM "course" WHERE "course"."teacher_id" = $1 AND "course"."id" = $2', [teacherId, courseId]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find one Course by Course_Id
    async findOneCourseByCourseId(courseId) {
        const result = await client.query('SELECT * FROM "course" WHERE "course"."id" = $1', [courseId]);
        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find one Admin by Admin_Id
    async findOneAdminById(adminId) {
        const result = await client.query('SELECT * FROM "teacher" WHERE "teacher"."id" = $1', [adminId]);
        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find all Favorites_Refs by Course_Id
    async findAllFavoritesRefsByCourseId(courseId) {
        const result = await client.query('SELECT * FROM "be_favorite" WHERE "be_favorite"."course_id" = $1', [courseId]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Add one Course by newCourse
    async insertOneCourse(newCourse) {
        const preparedQuery = {
            text: 'SELECT * FROM insert_course($1)',
            values: [newCourse],
        };

        const savedUser = await client.query(preparedQuery);
        return savedUser.rows[0];
    },

    // Update one Course own by Teacher by Course
    async updateOneCourse(course) {
        const preparedQuery = {
            text: 'SELECT * FROM update_teacher_course($1)',
            values: [course],
        };
        const savedTeacher = await client.query(preparedQuery);

        return savedTeacher.rows[0];
    },

    // Update one Avatar by Teacher_Id
    async updateOneAvatar(teacher) {
        const preparedQuery = {
            text: 'SELECT * FROM update_teacher($1)',
            values: [teacher],
        };

        const savedPost = await client.query(preparedQuery);
        return savedPost.rows[0];
    },

    // Delete all Courses by Teacher_Id
    async deleteAllCourses(teacherId) {
        const result = await client.query('DELETE FROM "course" WHERE "course"."teacher_id" = $1', [teacherId]);
        return !!result.rowCount;
    },

    // Delete all Favorites_Refs by Course_Id
    async deleteAllFavoritesRefsByCourseId(courseId) {
        const result = await client.query('DELETE FROM "be_favorite" WHERE "course_id" = $1', [courseId]);
        return !!result.rowCount;
    },

    // Delete one Course by Id
    async deleteOneCourse(id) {
        const result = await client.query('DELETE FROM "course" WHERE id = $1', [id]);
        return !!result.rowCount;
    },

    // Delete one Account by Teacher_Id
    async deleteOneAccount(teacherId) {
        const result = await client.query('DELETE FROM "teacher" WHERE id = $1', [teacherId]);
        return !!result.rowCount;
    },

};
