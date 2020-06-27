import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { handleValidation } from '@middlewares/validator';

const validateEmiailExistsSchema = Joi.object().keys({
    email: Joi.string().email().required()
});

const validateLoginRegisterSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export class UsuarioMiddleware {

    static validateEmiailExists(req: Request, res: Response, next: NextFunction) {
        return handleValidation(req.body, validateEmiailExistsSchema, res, next);
    }

    static validateLoginRegister(req: Request, res: Response, next: NextFunction) {
        return handleValidation(req.body, validateLoginRegisterSchema, res, next);
    }

}