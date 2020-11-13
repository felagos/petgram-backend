import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { UserService } from '@services';
import { BaseController } from './base.controller';

@injectable()
export class UserController extends BaseController {

    @inject(UserService) private userService: UserService

    public existsEmail = async (req: Request, res: Response) => {
        const { email } = req.body;
        const response = await this.userService.existsEmail(email);
        return this.getResponse(res, response);
    }

    public doLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const response = await this.userService.doLogin(email, password);
        return this.getResponse(res, response);
    }

    public registerUser = async (req: Request, res: Response) => {
        const dataUser = req.body;
        const response = await this.userService.doRegisterUser(dataUser);
        return this.getResponse(res, response);
    }

    public generateToken = async (req: Request, res: Response) => {
        const { user } = req.body;
        const response = this.userService.generateToken(user);
        return this.getResponse(res, response);
    }

}
