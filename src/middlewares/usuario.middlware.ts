import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const validateEmiailExistsSchema = Joi.object().keys({
    email: Joi.string().email().required()
});

export class UsuarioMiddleware {

    static validateEmiailExists(req: Request, res: Response, next: NextFunction) {
        const { error } = Joi.validate(req.body, validateEmiailExistsSchema);

        if (error)
            return res.status(401).send("Datos inválidos");

        next();
    }

}