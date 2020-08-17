import { Request, Response } from 'express';
import { HttpStatus } from '@enums';
import { ResponseData, UserModel } from '@models';
import { inject, injectable } from 'inversify';
import { UserService } from '@services';

@injectable()
export class UserController {

    @inject(UserService) private userService: UserService

    public existsEmail = async (req: Request, res: Response) => {
        const { email } = req.body;
        const response = await this.userService.existsEmail(email);

        return res.status(HttpStatus.OK).json({ data: response });
    }

    public doLogin = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const response = await this.userService.doLogin(email, password);

        if (response)
            return res.status(HttpStatus.OK).json(new ResponseData(response));

        return res.status(HttpStatus.NOT_FOUND).json({ message: "Usuario no encontrado" });
    }

    public registerUser = async (req: Request, res: Response) => {
        const dataUser: UserModel = req.body as UserModel;
        const response = this.userService.doRegisterUser(dataUser);

        if (response)
            return res.status(HttpStatus.CREATE).json(new ResponseData(response));

        return res.status(HttpStatus.NOT_FOUND).json({ message: "Error al registrar el usuario" });
    }

    public generateToken = async (req: Request, res: Response) => {
        const { user } = req.body;
        const respsonse = this.userService.generateToken(user);

        return res.status(HttpStatus.CREATE).json(new ResponseData(respsonse));
    }

}
