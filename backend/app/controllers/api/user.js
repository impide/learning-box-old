/* eslint-disable no-console */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from 'fs';

import userDataMapper from '../../models/user.js';
import teacherDataMapper from '../../models/teacher.js';
import nodemailerManager from '../../services/nodemailerManager.js';
import commentManager from '../../services/commentManager.js';
import noteManager from '../../services/noteManager.js';

import {
    UserAlreadyExist, NotFoundError, Unauthorized, FileError, UnlinkFile,
} from '../../helpers/errorClasses/errorClasses.js';

export default {

    // Get all Users Records.
    async getAll(_req, res) {
        const users = await userDataMapper.findAllUsers();

        return res.status(200).json({
            status: 200,
            result: users,
        });
    },

    // Let User create an Account
    async signup(req, res) {
        console.log('CONTROLLER PASSED');
        const { email, password } = req.body;

        const user = await userDataMapper.findOneUserByEmail(email);
        if (user) {
            throw new UserAlreadyExist('This email address is already associated to an account');
        }

        // Encrypted Password and Update it
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            ...req.body, password: encryptedPassword,
        };

        // Insert one User
        const savedUser = await userDataMapper.insertOneUser(newUser);
        console.log('DATAMAPPER PASSED');
        delete savedUser.password;

        return res.status(200).json({
            status: 200,
            message: 'User created Successfully',
            result: savedUser,
        });
    },

    // Let User log into an Account.
    async login(req, res) {
        const { email, password } = req.body;

        // Get all Users & Admins
        const user = await userDataMapper.findOneUserJoinByEmail(email);
        const teacher = await teacherDataMapper.findOneTeacherJoinByEmail(email);

        // For the result that is true, it will be => anyUser
        const anyUser = { ...user, ...teacher };
        if (Object.values(anyUser)) {
            // Compare BDD Password with Entered Password **Temporary Hardly Emcrypted**
            let comparePassword;
            if (anyUser.pseudo === 'Yanis' || anyUser.pseudo === 'Zijun' || anyUser.pseudo === 'Louis'
                || anyUser.pseudo === 'Nathanael' || anyUser.pseudo === 'Jean' || anyUser.pseudo === 'Adam') {
                const encryptedPassword = await bcrypt.hash(anyUser.password, 10);
                comparePassword = await bcrypt.compare(password, encryptedPassword);
            } else {
                comparePassword = await bcrypt.compare(password, anyUser.password);
            }

            if (!comparePassword) {
                throw new Unauthorized('Connection Unauthorized');
            }

            // If it's correct, delete password from Result
            delete anyUser.password;
            const { SECRET } = process.env;

            return res.status(200).json({
                status: 200,
                message: 'User connected Successfully',
                result: anyUser,
                token: jwt.sign(
                    { userId: anyUser.id },
                    SECRET,
                    { expiresIn: '1h' },
                ),
            });
        }
        throw new NotFoundError('User does not existed');
    },

    // Let User add Course as Favorite
    async addToFavorite(req, res) {
        const userId = parseInt(req.params.userId, 10);
        const courseId = parseInt(req.params.courseId, 10);
        const userAndCourseIds = { user_id: userId, course_id: courseId };

        // Retrieve Favorite_Ref by Ids if exist
        const isFavorite = await userDataMapper.findOneFavoriteRefByIds(userId, courseId);
        if (isFavorite === 'REMOVE') {
            const courseFavorite = await userDataMapper.deleteOneFavoriteRefByIds(userId, courseId);
            return res.json(courseFavorite);
        }

        // If not, Add it
        const courseFavorite = await userDataMapper.insertOneFavorite(userAndCourseIds);

        return res.status(200).json({
            status: 200,
            result: courseFavorite,
        });
    },

    // Add One Comment by User
    async addOneComment(req, res) {
        // Retrive userId & courseId params
        const userId = parseInt(req.params.userId, 10);
        const courseId = parseInt(req.params.courseId, 10);

        // Retrieve Course by Id if exist
        const course = await teacherDataMapper.findOneCourseByCourseId(courseId);
        if (!course) {
            throw new NotFoundError('course does not existed');
        }

        // Retrieve User by userId if exist
        const user = await userDataMapper.findOneUserByUserId(userId);
        if (!user) {
            throw new NotFoundError('User does not existed');
        }

        // Retrieve Original Comment & Push new Value
        const { comment } = course;
        const importedComment = commentManager.updateCommentsValues(comment, req.body);
        comment.push({ userId, comment: importedComment });

        // Fusion with Course & Render the result
        const courseComment = { ...course, comment };
        const saveComment = await userDataMapper.updateComment(courseComment);

        return res.status(200).json({
            status: 200,
            message: 'Add comment Successfully',
            result: saveComment,
        });
    },

    // Add one note by User
    async addOneNote(req, res) {
        // Retrive userId & courseId params
        const userId = parseInt(req.params.userId, 10);
        const courseId = parseInt(req.params.courseId, 10);

        // Retrive Course by Id if exist
        const course = await teacherDataMapper.findOneCourseByCourseId(courseId);
        if (!course) {
            throw new NotFoundError('Course does not existed');
        }

        // Retrieve User by userId if exist
        const user = await userDataMapper.findOneUserByUserId(userId);
        if (!user) {
            throw new NotFoundError('User does not existed');
        }

        // Mettre une condition qui vérifie si l'utilisateur à mis le cour en favoris
        const favoritesRef = await userDataMapper.findOneFavoriteRefByIds(userId, courseId);
        if (!favoritesRef) {
            throw new NotFoundError('You must have this course bookmarked to rate it');
        }

        const { note } = course;
        const body = { ...req.body, userId };
        const importedNote = noteManager.updateNotesValues(note, body);
        note.push(importedNote);

        // Fusion with Course & Render the result
        const courseNote = { ...course, note };
        const saveNote = await userDataMapper.updateNote(courseNote);

        return res.status(200).json({
            status: 200,
            message: 'Add note Successfully',
            result: saveNote,
        });
    },

    async updateOneAvatar(req, res) {
        const userId = parseInt(req.params.userId, 10);

        // Check if Files is sended
        if (!req.file) {
            throw new FileError('Error when Updating Avatar User.');
        }

        const user = await userDataMapper.findOneUserByUserId(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        // If an Image is already Save, delete it
        if (!(user.avatar.includes('unsplash'))) {
            const filename = user.avatar.split('/images/')[1];
            fs.unlink(`public/images/${filename}`, (err) => {
                if (err) {
                    throw new UnlinkFile(err);
                }
            });
        }

        // Replace by new Avatar
        const url = `${req.protocol}://${req.get('host')}`;
        user.avatar = `${url}/public/images/${req.file.filename}`;
        const savedUser = await userDataMapper.updateProfilUser(user);

        // Delete password from Result
        delete savedUser.password;

        return res.status(200).json({
            status: 200,
            message: 'Avatar Updated Successfully',
            result: savedUser,
        });
    },

    // Let User update his Pseudo
    async updateOnePseudo(req, res) {
        const userId = parseInt(req.params.userId, 10);
        const { pseudo } = req.body;

        const user = await userDataMapper.findOneUserByUserId(userId);
        if (!user) {
            throw new UserAlreadyExist('User not found');
        }

        // Replace by new Pseudo
        user.pseudo = pseudo;
        const savedPseudo = await userDataMapper.updateProfilUser(user);

        return res.status(200).json({
            status: 200,
            message: 'User Pseudo Updated Successfully',
            result: savedPseudo,
        });
    },

    // Let User update his Email
    async updateOneEmail(req, res) {
        const userId = parseInt(req.params.userId, 10);
        const { password, email } = req.body;

        const user = await userDataMapper.findOneUserByUserId(userId);
        if (!user) {
            throw new UserAlreadyExist('User not found');
        }

        // Compare BDD Password with Entered Password
        const comparePassword = bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new Unauthorized('Connection Unauthorized');
        }

        // Replace by new Email
        user.email = email;
        const savedEmail = await userDataMapper.updateProfilUser(user);

        return res.status(200).json({
            status: 200,
            message: 'User Pseudo Updated Successfully',
            result: savedEmail,
        });
    },

    // Send Mail to modify Password
    async forgotPassword(req, res) {
        const { email } = req.body;

        const oldUser = await userDataMapper.findOneUserByEmail(email);
        if (!oldUser) {
            throw new NotFoundError('User not found');
        }

        // Give User a Token for all the process
        const secret = process.env.RESET_PASSWORD + oldUser.password;
        const token = jwt.sign(
            { id: oldUser.id, email: oldUser.email },
            secret,
            { expiresIn: '20m' },
        );

        // Send Email with Nodemailer
        const link = `http://localhost:${process.env.PORT}/api/users/reset-password/${oldUser.id}/${token}`;
        nodemailerManager.nodemailer(oldUser, link, res);
    },

    // Verify User after Clicked on Confirmation Email
    async resetPassword(req, res) {
        const userId = parseInt(req.params.userId, 10);
        const { token } = req.params;

        const oldUser = await userDataMapper.findOneUserByUserId(userId);
        if (!oldUser) {
            throw new NotFoundError('User not found');
        }

        // Verify User for Security process
        const secret = process.env.RESET_PASSWORD + oldUser.password;
        try {
            jwt.verify(token, secret);
            res.send('Verified');
        } catch (error) {
            res.send('Not Verified');
        }
    },

    // Update User Password.
    async updatePassword(req, res) {
        const userId = parseInt(req.params.userId, 10);
        const { password } = req.body;

        const oldUser = await userDataMapper.findOneUserByUserId(userId);
        if (!oldUser) {
            throw new NotFoundError('User not found');
        }

        // Retrieve body Password and Update it
        const encryptedPassword = await bcrypt.hash(password, 10);
        const newUser = { ...oldUser, password: encryptedPassword };
        const savedUser = await userDataMapper.updateProfilUser(newUser);

        return res.status(200).json({
            status: 200,
            message: 'Password Updated Successfully',
            result: savedUser,
        });
    },

    // Let User delete Account
    async deleteAccount(req, res) {
        const userId = parseInt(req.params.userId, 10);

        const user = await userDataMapper.findOneUserByUserId(userId);
        if (!user) {
            throw new NotFoundError('This User does not exists');
        }

        // If an Image is already Save, delete it
        if (!(user.avatar.includes('unsplash'))) {
            const filename = user.avatar.split('/images/')[1];
            fs.unlink(`public/images/${filename}`, (err) => {
                if (err) {
                    throw new UnlinkFile(err);
                }
            });
        }

        // Retrieve and Delete all Favorite_Ref
        const favoritesRef = await userDataMapper.findAllFavoritesRefByUserId(userId);
        if (favoritesRef) {
            await userDataMapper.deleteAllFavoritesRefByUserId(userId);
        }

        await userDataMapper.deleteOneAccountByUserId(userId);
        return res.status(204).json();
    },

};
