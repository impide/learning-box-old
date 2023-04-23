import debug from 'debug';

const debugValidator = debug('Validator:log');

/**
 * Générateur de middleware pour la validation
 * d'un objet d'un des propriété de la requête
 * @param {string} prop - Nom de la propriété de l'objet request à valider
 * @param {Joi.object} schema - Le schema de validation du module Joi
 * @returns
 * Renvoi un middleware pour express qui valide
 * le corp de la requête en utilisant le schema passé en paramètre.
 * Renvoi une erreur 400 si la validation échoue.
 */

export default (prop, schema) => async (request, _, next) => {
    try {
        // request[prop] == request['body'] == request.body
        debugValidator(request[prop]);
        await schema.validateAsync(request[prop]);
        next();
    } catch (err) {
        next(err);
    }
};
