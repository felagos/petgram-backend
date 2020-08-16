import Joi, { ObjectSchema } from 'joi';
import { Response, NextFunction } from 'express';
import { HttpStatus } from '@enums';

export const handleValidation = (data: any, schema: ObjectSchema, res: Response, next: NextFunction): void | Response<any> => {
    const { error } = Joi.validate(data, schema);
    if (error)
        return res.status(HttpStatus.BAD_REQUEST).send("Datos inválidos");

    return next();
}