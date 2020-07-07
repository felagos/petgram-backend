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

    public validateRefreshToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshStoken = req.headers.authorization || null;

            if (refreshStoken === null)
                return res.sendStatus(HttpStatus.UNAUTHORIZED);

            const payload = this.jwtHelper.decodeRefresh(refreshStoken);
            const { user } = payload;

            const hasToken = await this.tokenService.hasToken(user.email);
            if (!hasToken)
                return res.sendStatus(HttpStatus.UNAUTHORIZED);

            req.body = user;

            return next();
        } catch (e) {
            return res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    }


    public validateToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization || "";
            
            const payload = this.jwtHelper.decode(token);
            if (!payload)
                return res.sendStatus(HttpStatus.UNAUTHORIZED);

            return next();
        } catch (e) {
            return res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    }
    public validateHasRefreshToken = (req: Request, res: Response, next: NextFunction) => {
        return handleValidation(req.body, validateHasTokenSchema, res, next);
    }

}