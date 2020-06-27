import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { handleValidation } from './validator';

const getMascotaByCategoriIdSchema = Joi.object().keys({
    categoriaId: Joi.string().required()
});

export class MascotaMiddleware {

    static validateGetCategoriaById(req: Request, res: Response, next: NextFunction) {
        return handleValidation(req.params, getMascotaByCategoriIdSchema, res, next);
    }

}