import client from '../helpers/connectToDatabase.js';

export default {

    // Find all Users Order by Id
    async findAllUsers() {
        const result = await client.query('SELECT "id", "email", "pseudo", "avatar", "role" FROM "user" ORDER BY "user"."id"');
        return result.rows;
    },

    // Find one User by User_Id
    async findOneUserByUserId(userId) {
        const result = await client.query('SELECT * FROM "user" WHERE "id" = $1', [userId]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find one User by Email (Signup & Login)
    async findOneUserByEmail(email) {
        const result = await client.query('SELECT * FROM "user" WHERE "email" = $1', [email]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find one Favorite_Ref by Ids
    async findOneFavoriteRefByIds(userId, courseId) {
        const result = await client.query('SELECT * FROM "be_favorite" WHERE "be_favorite"."user_id" = $1 AND "be_favorite"."course_id" = $2', [userId, courseId]);

        if (result.rowCount > 0) {
            return 'REMOVE';
        }

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find all Favorites_Refs by Id
    async findAllFavoritesRefByUserId(userId) {
        const result = await client.query('SELECT * FROM "be_favorite" WHERE "be_favorite"."user_id" = $1', [userId]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Find one User by Email join with Course and Category
    async findOneUserJoinByEmail(email) {
        const result = await client.query('SELECT * FROM "users_with_course_and_category" WHERE "email" = $1', [email]);

        if (result.rowCount === 0) {
            return null;
        }

        return result.rows[0];
    },

    // Add User
    async insertOneUser(newUser) {
        const preparedQuery = {
            text: 'SELECT * FROM insert_user($1)',
            values: [newUser],
        };

        const savedUser = await client.query(preparedQuery);
        return savedUser.rows[0];
    },

    // Add Course to Favorite_Ref
    async insertOneFavorite(course) {
        const preparedQuery = {
            text: 'SELECT * FROM insert_to_favorite($1)',
            values: [course],
        };

        const savedUser = await client.query(preparedQuery);
        return savedUser.rows[0];
    },

    // Update User
    async updateProfilUser(user) {
        const preparedQuery = {
            text: 'SELECT * FROM update_user($1)',
            values: [user],
        };
        const savedUpdateComment = await client.query(preparedQuery);
        return savedUpdateComment.rows[0];
    },

    // Add one Comment
    async updateComment(course) {
        const preparedQuery = {
            text: 'SELECT * FROM update_comment_note($1)',
            values: [course],
        };
        const savedUpdateComment = await client.query(preparedQuery);
        return savedUpdateComment.rows[0];
    },

    // Add one Note
    async updateNote(course) {
        const preparedQuery = {
            text: 'SELECT * FROM update_comment_note($1)',
            values: [course],
        };
        const savedUpdateComment = await client.query(preparedQuery);
        return savedUpdateComment.rows[0];
    },

    // Update User Avatar by User
    async updateOneAvatar(user) {
        const preparedQuery = {
            text: 'SELECT * FROM update_user($1)',
            values: [user],
        };

        const savedPost = await client.query(preparedQuery);
        return savedPost.rows[0];
    },

    // Remove one Favorite_Ref by Ids
    async deleteOneFavoriteRefByIds(userId, courseId) {
        const result = await client.query('DELETE FROM "be_favorite" WHERE "be_favorite"."user_id" = $1 AND "be_favorite"."course_id" = $2', [userId, courseId]);
        return !!result.rowCount;
    },

    // Remove all Favorites_Ref by Id
    async deleteAllFavoritesRefByUserId(userId) {
        const result = await client.query('DELETE FROM "be_favorite" WHERE "be_favorite"."user_id" = $1', [userId]);
        return !!result.rowCount;
    },

    // Delete User Account
    async deleteOneAccountByUserId(userId) {
        const result = await client.query('DELETE FROM "user" WHERE id = $1', [userId]);
        return !!result.rowCount;
    },
};
