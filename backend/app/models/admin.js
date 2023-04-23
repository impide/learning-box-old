import client from '../helpers/connectToDatabase.js';

export default {
    // Find all Categories with Sub-Categories Order By Id
    async findAllCategories() {
        const result = await client.query('SELECT * FROM "category_with_sub_category"');
        return result.rows;
    },

    // Find one Category By Category_Id
    async findOneCategoryById(categoryId) {
        const result = await client.query('SELECT * FROM "category" WHERE "id" = $1', [categoryId]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find all Categories By Parent_Id
    async findAllCategoriesByParentId(parentId) {
        const result = await client.query('SELECT * FROM "category" WHERE "parent" = $1', [parentId]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows;
    },

    // Find all Courses
    async findAllCourses() {
        const result = await client.query('SELECT * FROM "course_with_category"');
        return result.rows;
    },

    // Find one Course by Category_Id
    async findAllCoursesById(categoryId) {
        const result = await client.query('SELECT * FROM "course" WHERE "category_id" = $1', [categoryId]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows;
    },

    // Find all Favorites_Refs by Course_Id
    async findAllFavoriteRefByCourseId(courseId) {
        const result = await client.query('SELECT * FROM "be_favorite" WHERE "course_id" = $1', [courseId]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Add one Category
    async insertOneCategory(newCategory) {
        const preparedQuery = {
            text: 'SELECT * FROM insert_category($1)',
            values: [newCategory],
        };

        const savedUser = await client.query(preparedQuery);
        return savedUser.rows[0];
    },

    // Update one Category by Category
    async updateOneCategory(newCategory) {
        const preparedQuery = {
            text: 'SELECT * FROM update_category($1)',
            values: [newCategory],
        };
        const savedTeacher = await client.query(preparedQuery);

        return savedTeacher.rows[0];
    },

    // Delete all Courses by Category_Id
    async deleteAllCoursesByCategoryId(categoryId) {
        const result = await client.query('DELETE FROM "course" WHERE "category_id" = ($1)', [categoryId]);
        return !!result.rowCount;
    },

    // Delete one Category by Category_Id
    async deleteOneCategoryByCategoryId(categoryId) {
        const result = await client.query('DELETE FROM "category" WHERE "id" = $1', [categoryId]);
        return !!result.rowCount;
    },

    // Delete all Sub-Categories by Category_Id
    async deleteAllSubCategoryByCategoryId(categoryId) {
        const result = await client.query('DELETE FROM "category" WHERE "parent" = $1', [categoryId]);
        return !!result.rowCount;
    },
};
