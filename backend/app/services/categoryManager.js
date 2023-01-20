import { UserInputError } from '../helpers/errorClasses/errorClasses.js';

export default {
    updateCategoriesValues(category, body) {
        const importedCategory = {};

        Object.keys(category).forEach((column) => {
            // Among the modifications if label is unchanged, return Error
            if (column === 'title' && body[column] === category[column]) {
                throw new UserInputError('Title must be Unique');
            }
            if (body[column] && body[column] !== category[column]) {
                // We add to our empty object, the new KEY/VALUE
                importedCategory[column] = body[column];
            }
        });

        return importedCategory;
    },
};
