import { BadRequestError } from "../utils/errors.mjs";

export const validateProduct = (schema) => { // este middleware se va a utilizar previo a cada solicitud POST/PUT de productos
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body); // se llama a Joi para validación de datos
        if (error) {
            throw new BadRequestError('Datos inválidos.', error.details[0].message);
        }
        req.body = value;
        next();
    };
};
