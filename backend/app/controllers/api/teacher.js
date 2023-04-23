import fs from 'fs';
import teacherDataMapper from '../../models/teacher.js';
import userDataMapper from '../../models/user.js';

import srcNamesManager from '../../services/namesManager.js';
import columnsValuesManager from '../../services/columnsManager.js';
import filesSourcesManager from '../../services/filesManager.js';
import updateCommentsValues from '../../services/commentManager.js';

import {
    FileError, Forbidden, NotFoundError, UnlinkFile, Unauthorized,
} from '../../helpers/errorClasses/errorClasses.js';

export default {
    // Get all Teachers Records with Courses and Categories
    async getAll(req, res) {
        const teachers = await teacherDataMapper.findAllTeachersJoin();

        return res.status(200).json({
            status: 200,
            result: teachers,
        });
    },

    // Let Teacher add Course.
    async addCourse(req, res) {
        const teacherId = parseInt(req.params.teacherId, 10);
        const categoryId = parseInt(req.params.categoryId, 10);

        const teacher = await teacherDataMapper.findOneTeacherByTeacherId(teacherId);
        if (teacher.role === 0) {
            throw new Forbidden('You do not have permission to Add Course');
        }

        // Check if Files is sended
        if (!req.files) {
            throw new FileError('Error when uploading Video & PDF files.');
        }

        // Define source-names for Each Files
        srcNamesManager(req, res);
        // Create Course and Save it
        const author = teacher.pseudo;
        const newCourse = {
            ...req.body, author, teacherId, categoryId,
        };

        const saveCourse = await teacherDataMapper.insertOneCourse(newCourse);

        return res.status(200).json({
            status: 200,
            message: 'Course added Successfully',
            result: saveCourse,
        });
    },

    // Let Teacher add Comment.
    async addOneComment(req, res) {
        // Retrive userId & courseId params
        const teacherId = parseInt(req.params.teacherId, 10);
        const courseId = parseInt(req.params.courseId, 10);

        // Retrive Course by Id if exist
        const course = await teacherDataMapper.findOneCourseByCourseId(courseId);
        if (!course) {
            throw new NotFoundError('Course does not existed');
        }

        // Retrieve User by userId if exist
        const teacher = await teacherDataMapper.findOneTeacherByTeacherId(teacherId);
        if (!teacher) {
            throw new NotFoundError('Teacher does not existed');
        }

        // Retrieve Original Comment & Push new Value
        const { comment } = course;
        const importedComment = updateCommentsValues.updateCommentsValues(comment, req.body);
        comment.push({ teacherId, comment: importedComment });

        // Fusion with Course & Render the result
        const courseComment = { ...course, comment };
        const saveComment = await userDataMapper.updateComment(courseComment);

        return res.status(200).json({
            status: 200,
            message: 'Add comment Successfully',
            result: saveComment,
        });
    },

    // Update Course by teacher
    async updateOneCourse(req, res) {
        const teacherId = parseInt(req.params.teacherId, 10);
        const courseId = parseInt(req.params.courseId, 10);

        const teacher = await teacherDataMapper.findOneTeacherByTeacherId(teacherId);
        if (teacher.role === 0) {
            throw new Forbidden('You do not have permission to Update Course');
        }

        const course = await teacherDataMapper.findOneCourseByIds(teacherId, courseId);
        if (!course) {
            throw new NotFoundError('This course does not exists');
        }

        // Update only the Body we receive
        const importedCourse = columnsValuesManager.updateColumnsValues(course, req.body);

        // If Image is modified Delete precious ones
        const url = `${req.protocol}://${req.get('host')}`;
        const importedFiles = filesSourcesManager.updateFilesSources(course, url, req.files);
        const { video, PDF } = importedFiles;

        // Save and Return result
        const newCourse = {
            ...course, ...importedCourse, video, PDF,
        };
        const saveCourse = await teacherDataMapper.updateOneCourse(newCourse);

        return res.status(200).json({
            status: 200,
            message: 'Course Updated Successfully',
            result: saveCourse,
        });
    },

    // Let Teacher update his Avatar.
    async updateOneAvatar(req, res) {
        const teacherId = parseInt(req.params.teacherId, 10);

        // Check if Files is sended
        if (!req.file) {
            throw new FileError('Error when Updating Avatar Teacher.');
        }

        // Retrieve User by Id if exist
        const teacher = await teacherDataMapper.findOneTeacherByTeacherId(teacherId);
        if (!teacher) {
            throw new NotFoundError('Teacher not found');
        }

        // If an Image is already Save, delete it
        if (!teacher.avatar.match('https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80')) {
            const filename = teacher.avatar.split('/images/')[1];
            fs.unlink(`public/images/${filename}`, (err) => {
                if (err) {
                    throw new UnlinkFile(err);
                }
            });
        }

        // Replace by new Avatar
        const url = `${req.protocol}://${req.get('host')}`;
        teacher.avatar = `${url}/public/images/${req.file.filename}`;
        const savedTeacher = await teacherDataMapper.updateOneAvatar(teacher);

        // Return User with new Avatar
        delete savedTeacher.password;
        return res.status(200).json({
            status: 200,
            message: 'Avatar Updated Successfully',
            result: savedTeacher,
        });
    },

    // Let Teacher Delete Course.
    async deleteOneCourse(req, res) {
        const teacherId = parseInt(req.params.teacherId, 10);
        const courseId = parseInt(req.params.courseId, 10);

        const teachers = await teacherDataMapper.findOneTeacherByTeacherId(teacherId);
        if (teachers.role === 0) {
            throw new Forbidden('You do not have permission to Update Course');
        }

        // Retrieve Course by Ids if exist
        const course = await teacherDataMapper.findOneCourseByIds(teacherId, courseId);
        if (!course) {
            throw new NotFoundError('This course of this teacher does not exists');
        }

        // If Video & PDF is already Save, delete it
        const arrayFiles = [];
        const videoFilename = course.video.split('/files/')[1];
        const pdfFilename = course.PDF.split('/files/')[1];

        arrayFiles.push(videoFilename, pdfFilename);
        arrayFiles.forEach((file) => {
            fs.unlink(`public/files/${file}`, (err) => {
                if (err) {
                    throw new UnlinkFile(err);
                }
            });
        });

        await teacherDataMapper.deleteAllFavoritesRefsByCourseId(courseId);
        await teacherDataMapper.deleteOneCourse(courseId);
        return res.status(204).json();
    },

    // Let Teacher delete Account
    async deleteAccount(req, res) {
        const teacherId = parseInt(req.params.teacherId, 10);

        // Retrieve User by Id if exist
        const teacher = await teacherDataMapper.findOneTeacherByTeacherId(teacherId);
        if (!teacher || teacher.role === 2) {
            throw new Unauthorized('Unauthorized');
        }

        // If an Image is already Save, delete it
        if (!teacher.avatar.match('https://images.unsplash.com/photo-1671519821564-ced7e41ee7ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80')) {
            const filename = teacher.avatar.split('/images/')[1];
            fs.unlink(`public/images/${filename}`, (err) => {
                if (err) {
                    throw new UnlinkFile(err);
                }
            });
        }

        // Retrieve Course, Favorites_Refs and Delete
        const course = await teacherDataMapper.findAllCoursesByTeacherId(teacherId);
        if (!course) {
            throw new NotFoundError('This course does not exists');
        }

        const favoritesRefs = await teacherDataMapper.findAllFavoritesRefsByCourseId(course.id);
        if (favoritesRefs) {
            await teacherDataMapper.deleteAllFavoritesRefsByCourseId(favoritesRefs.course_id);
        }

        await teacherDataMapper.deleteAllCourses(teacherId);
        await teacherDataMapper.deleteOneAccount(teacherId);
        return res.status(204).json();
    },
};
