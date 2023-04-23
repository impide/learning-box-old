import fs from 'fs';
import adminDataMapper from '../../models/admin.js';
import teacherDataMapper from '../../models/teacher.js';

import columnsValuesManager from '../../services/columnsManager.js';
import categoriesValuesManager from '../../services/categoryManager.js';

import { NotFoundError, Forbidden, UnlinkFile } from '../../helpers/errorClasses/errorClasses.js';

export default {
    // Let Admin add Category.
    async addOneCategory(req, res) {
        const adminId = parseInt(req.params.adminId, 10);
        const parentId = parseInt(req.params.parentId, 10);

        const admin = await teacherDataMapper.findOneAdminById(adminId);
        if (!admin || !(admin.role === 2)) {
            throw new Forbidden('You do not have permission to do this action');
        }

        const parent = await adminDataMapper.findOneCategoryById(parentId);
        if (!parent) {
            throw new Error('This Parent Category don\'t exist');
        }

        // Create Category and Save it
        const newCategory = { ...req.body, parent: parentId };
        const saveCategory = await adminDataMapper.insertOneCategory(newCategory);

        return res.status(200).json({
            status: 200,
            message: 'Category Create Successfully',
            result: saveCategory,
        });
    },

    // Let Admin Update Category.
    async updateOneCategory(req, res) {
        const adminId = parseInt(req.params.adminId, 10);
        const categoryId = parseInt(req.params.categoryId, 10);

        const admin = await teacherDataMapper.findOneAdminById(adminId);
        if (!admin || !(admin.role === 2)) {
            throw new Forbidden('You do not have permission to do this action');
        }

        const category = await adminDataMapper.findOneCategoryById(categoryId);
        if (!category) {
            throw new NotFoundError('This category does not exists');
        }

        // Update only the Body we receive
        const importedCategory = categoriesValuesManager.updateCategoriesValues(category, req.body);

        // Save and Return result
        const newCategory = { ...category, ...importedCategory };
        const saveCategory = await adminDataMapper.updateOneCategory(newCategory);

        return res.status(200).json({
            status: 200,
            message: 'Category Updated Successfully',
            result: saveCategory,
        });
    },

    // Let Admin Update Course Partially.
    async updateOneCourseByAdmin(req, res) {
        const adminId = parseInt(req.params.adminId, 10);
        const courseId = parseInt(req.params.courseId, 10);

        const course = await teacherDataMapper.findOneCourseByCourseId(courseId);
        if (!course) {
            throw new NotFoundError('This course does not exists');
        }

        const admin = await teacherDataMapper.findOneAdminById(adminId);
        if (!admin || !(admin.role === 2)) {
            throw new Forbidden('You do not have permission to do this action');
        }

        // Update only the Body we receive & Save and Return result
        const importedCourse = columnsValuesManager.updateColumnsValues(course, req.body);
        const newCourse = { ...course, ...importedCourse };
        const saveCourse = await teacherDataMapper.updateOneCourse(newCourse);

        return res.status(200).json({
            status: 200,
            message: 'Course Updated Successfully',
            result: saveCourse,
        });
    },

    // Let Admin Delete Course.
    async deleteOneCourseByAdmin(req, res) {
        const adminId = parseInt(req.params.adminId, 10);
        const courseId = parseInt(req.params.courseId, 10);

        const course = await teacherDataMapper.findOneCourseByCourseId(courseId);
        if (!course) {
            throw new NotFoundError('This course of this teacher does not exists');
        }

        const admin = await teacherDataMapper.findOneAdminById(adminId);
        if (!admin || !(admin.role === 2)) {
            throw new Forbidden('You do not have permission to access on this page');
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

    // Let Admin Delete Category.
    async deleteOneCategory(req, res) {
        const adminId = parseInt(req.params.adminId, 10);
        const categoryId = parseInt(req.params.categoryId, 10);

        const admin = await teacherDataMapper.findOneAdminById(adminId);
        if (!admin || !(admin.role === 2)) {
            throw new Forbidden('You do not have permission to do this action');
        }

        const category = await adminDataMapper.findOneCategoryById(categoryId);
        if (!category) {
            throw new NotFoundError('This Category does not exists');
        }

        // Retrieve all Courses in this Category
        const courses = await adminDataMapper.findAllCoursesById(categoryId);
        if (courses) {
            await Promise.all(courses.map(async (course) => {
                // Delete FavoritesRefs first
                const favoriteRef = await adminDataMapper.findAllFavoriteRefByCourseId(course.id);
                if (favoriteRef) {
                    await teacherDataMapper.deleteAllFavoritesRefsByCourseId(course.id);
                }
                // Then Delete Courses
                await adminDataMapper.deleteAllCoursesByCategoryId(categoryId);
            }));
        }

        // Finally, Delete Category
        const subCategories = await adminDataMapper.findAllCategoriesByParentId(categoryId);
        if (subCategories) {
            await adminDataMapper.deleteAllSubCategoryByCategoryId(categoryId);
        }

        await adminDataMapper.deleteOneCategoryByCategoryId(categoryId);
        return res.status(204).json();
    },
};
