/* eslint-disable no-unused-vars */
import { UserInputError } from '../helpers/errorClasses/errorClasses.js';

export default {
    updateCommentsValues(comment, body) {
        let importedComment = null;

        // We need to map the array to return only the "how" values
        const commentsValues = comment.map((object) => object.comment);
        /* Thanks to indexOf, we can search among these values if other values are identical
       (indexOf => 1 = identical, indexOf => -1 = not identical) */
        console.log(commentsValues, body.comment);
        if (commentsValues.indexOf(body.comment) !== -1) {
            throw new UserInputError('Comment must be unique');
        } else {
            importedComment = body.comment;
        }

        return importedComment;
    },
};
