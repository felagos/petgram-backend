import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { handleValidation } from '@middlewares';
import { injectable } from 'inversify';

const getMascotaByCategoriIdSchema = Joi.object().keys({
    categoriaId: Joi.string().required(),
    page: Joi.number().required()
});

@injectable()
export class PetMiddleware {

    public validateGetCategoriaById(req: Request, res: Response, next: NextFunction) {
        return handleValidation(req.params, getMascotaByCategoriIdSchema, res, next);
    }

}