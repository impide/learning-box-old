import { UserInputError } from '../helpers/errorClasses/errorClasses.js';

export default {
    updateColumnsValues(course, body) {
        const importedCourse = {};

        Object.keys(course).forEach((column) => {
            // Among the modifications if label is unchanged, return Error
            if (column === 'label' && body[column] === course[column]) {
                throw new UserInputError('Label must be Unique');
            }
            if (body[column] && body[column] !== course[column]) {
                // We add to our empty object, the new KEY/VALUE
                importedCourse[column] = body[column];
            }
        });

        return importedCourse;
    },
};
