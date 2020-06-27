import Joi, { ObjectSchema } from 'joi';
import { Response, NextFunction } from 'express';

export const handleValidation = (data: any, schema: ObjectSchema, res: Response, next: NextFunction): void | Response<any> => {
    const { error } = Joi.validate(data, schema);
    if (error)
        return res.status(401).send("Datos inválidos");

    return next();
}