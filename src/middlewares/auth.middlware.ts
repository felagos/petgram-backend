import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { handleValidation } from '@middlewares';
import { JwtHelper } from '@helpers';
import { HttpStatus } from '@enums';
import { inject, injectable } from 'inversify';
import { TokenService } from '@services';

const validateEmiailExistsSchema = Joi.object().keys({
    email: Joi.string().email().required()
});

const validateLoginRegisterSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    nombre: Joi.string().required()
});

@injectable()
export class AuthMiddleware {

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

            const payload = this.jwtHelper.decode(refreshStoken, true);
            const { user } = payload;

            const hasToken = await this.tokenService.hasToken(user.email);
            if (!hasToken)
                return res.sendStatus(HttpStatus.UNAUTHORIZED);

            req.body.user = user;

            return next();
        } catch (e) {
            if (e.name === "JsonWebTokenError")
                return res.sendStatus(HttpStatus.FORBIDDEN);
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
            if (e.name === "JsonWebTokenError")
                return res.sendStatus(HttpStatus.FORBIDDEN);
            return res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
    }

}