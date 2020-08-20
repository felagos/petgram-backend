import { Request, Response } from 'express';
import { HttpStatus } from '@enums';
import { ResponseData, UserModel } from '@models';
import { inject, injectable } from 'inversify';
import { UserService } from '@services';
import { BaseController } from './base.controller';

@injectable()
export class UserController extends BaseController {

    @inject(UserService) private userService: UserService

    public existsEmail = async (req: Request, res: Response) => {
        const { email } = req.body;
        const response = await this.userService.existsEmail(email);

        return this.responseOK(res, response);
    }

    public doLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const response = await this.userService.doLogin(email, password);

        if (response)
            return this.responseOK(res, response);

        return this.responseNotFound(res);
    }

    public registerUser = async (req: Request, res: Response) => {
        const dataUser = req.body;
        const response = this.userService.doRegisterUser(dataUser);

        if (response)
            return this.responseCreate(res, response);

        return this.responseNotFound(res);
    }

    public generateToken = async (req: Request, res: Response) => {
        const { user } = req.body;
        const response = this.userService.generateToken(user);

        return this.responseCreate(res, response);
    }

}
