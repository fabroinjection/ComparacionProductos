import Joi  from 'joi';

export const productoSchema = Joi.object({ // se define el schema para validar los datos de entrada, evitando la validación manual en estructuras anidadas
    nombre: Joi.string().required().messages({
        'any.required': 'El nombre es requerido.',
        'string.base': 'El nombre debe ser una cadena de texto.',
    }),
    url: Joi.string().required().messages({
        'any.required': 'La URL es requerida.',
        'string.base': 'La URL debe ser una cadena de texto.',
    }),
    descripcion: Joi.string().required().messages({
        'any.required': 'La descripción es requerida.',
        'string.base': 'La descripción debe ser una cadena de texto.',
    }),
    precio: Joi.number().min(0).required().messages({
        'any.required': 'El precio es requerido.',
        'number.base': 'El precio debe ser un número.',
        'number.min': 'El precio debe ser mayor o igual a 0.',
    }),
    calificacion: Joi.number().min(0).max(5).required().messages({
        'any.required': 'La calificación es requerida.',
        'number.base': 'La calificación debe ser un número.',
        'number.min': 'La calificación debe ser mayor o igual a 0.',
        'number.max': 'La calificación debe ser menor o igual a 5.',
    }),
    especificaciones: Joi.object().required().messages({
        'any.required': 'Las especificaciones son requeridas.',
        'object.base': 'Las especificaciones deben ser un objeto.',
    }),
});