import { Request, Response } from 'express';
import { HttpStatus } from '@enums';
import { Payload, ResponseData, UserModel } from '@models';
import { JwtHelper } from '@helpers';
import { inject, injectable } from 'inversify';
import { UserService, TokenService } from '@services';

@injectable()
export class UserController {

    constructor(@inject(UserService) private userService: UserService,
        @inject(TokenService) private tokenService: TokenService,
        @inject(JwtHelper) private jwtHelper: JwtHelper) { }

    public existsEmail = async (req: Request, res: Response) => {
        const { email } = req.body;
        const response = await this.userService.existsEmail(email);

        return res.status(HttpStatus.OK).json({ data: response });
    }

    public doLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await this.userService.getUser(email, password);

        if (user) {
            const payload: Payload = {
                user
            }
            const token = this.jwtHelper.encode(payload);
            const refreshToken = this.jwtHelper.encodeRefresh(payload);

            await this.tokenService.updateToken(user.email, refreshToken);

            const response = {
                token, refreshToken
            };

            return res.status(HttpStatus.OK).json(new ResponseData(response));
        }

        return res.status(HttpStatus.NOT_FOUND).json({ message: "Usuario no encontrado" });
    }

    public registerUser = async (req: Request, res: Response) => {
        const dataUser: UserModel = req.body as UserModel;
        const user = await this.userService.registerUser(dataUser);

        if (user) {
            const payload: Payload = {
                user
            }
            const token = this.jwtHelper.encode(payload);
            const refreshToken = this.jwtHelper.encodeRefresh(payload);

            await this.tokenService.saveToken(user.email, refreshToken);

            const response = {
                token, refreshToken
            }

            return res.status(HttpStatus.CREATE).json(new ResponseData(response));
        }

        return res.status(HttpStatus.NOT_FOUND).json({ message: "Error al registrar el usuario" });
    }

    public generateToken = async (req: Request, res: Response) => {
        const { user } = req.body;
        const newPayload: Payload = {
            user
        };
        const token = this.jwtHelper.encode(newPayload);

        return res.status(HttpStatus.CREATE).json(new ResponseData(token));
    }

}
