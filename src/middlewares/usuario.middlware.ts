import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { handleValidation } from '@middlewares/validator';
import { JwtHelper } from '@helpers/jwt.helper';
import { HttpStatus } from '@enums/http.enum';
import { inject, injectable } from 'inversify';
import { TokenService } from '@services/token.service';

const validateEmiailExistsSchema = Joi.object().keys({
    email: Joi.string().email().required()
});

const validateLoginRegisterSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    nombre: Joi.string().required()
});

const validateHasTokenSchema = Joi.object().keys({
    refreshToken: Joi.string().email().required()
});

@injectable()
export class UsuarioMiddleware {

    constructor(@inject(TokenService) private tokenService: TokenService,
    @inject(JwtHelper) private jwtHelper: JwtHelper) { }

    public validateEmiailExists = (req: Request, res: Response, next: NextFunction) => {
        return handleValidation(req.body, validateEmiailExistsSchema, res, next);
    }

    public validateLoginRegister = (req: Request, res: Response, next: NextFunction) => {
        return handleValidation(req.body, validateLoginRegisterSchema, res, next);
    }

    public validateToken = async (req: Request, res: Response, next: NextFunction) => {
        const refreshStoken = req.headers.authorization || null;

        if (refreshStoken === null)
            return res.sendStatus(HttpStatus.UNAUTHORIZED);

        if (!this.jwtHelper.isValid(refreshStoken))
            return res.sendStatus(HttpStatus.FORBIDDEN);

        const payload = this.jwtHelper.decode(refreshStoken);
        const { user } = payload;

        const hasToken = await this.tokenService.hasToken(user.email);
        if (!hasToken)
            return res.sendStatus(HttpStatus.UNAUTHORIZED);

        return next();
    }

    public validateHasToken = (req: Request, res: Response, next: NextFunction) => {
        return handleValidation(req.body, validateHasTokenSchema, res, next);
    }

}