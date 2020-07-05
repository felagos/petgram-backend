import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { handleValidation } from '@middlewares/validator';
import { injectable } from 'inversify';

const getMascotaByCategoriIdSchema = Joi.object().keys({
    categoriaId: Joi.string().required()
});

@injectable()
export class MascotaMiddleware {

    public validateGetCategoriaById(req: Request, res: Response, next: NextFunction) {
        return handleValidation(req.params, getMascotaByCategoriIdSchema, res, next);
    }

}