import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const getMascotaByCategoriIdSchema = Joi.object().keys({
    categoriaId: Joi.string().required()
});

export class MascotaMiddleware {

    static validateGetCategoriaById(req: Request, res: Response, next: NextFunction) {
        const { error } = Joi.validate(req.params, getMascotaByCategoriIdSchema);

        if (error)
            return res.status(401).send("Datos inválidos");

        next();
    }

}