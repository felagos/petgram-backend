import { Request, Response } from 'express';
import { HttpStatus } from '@enums/http.enum';
import { Payload } from '@models/payload.model';
import { environment } from '@env';
import { JwtHelper } from '@helpers/jwt.helper';
import { UsuarioModel } from '@models/usuario.model';
import { ResponseData } from '@models/response.model';
import { inject, injectable } from 'inversify';
import { UsuarioService } from '@services/usuario.service';

@injectable()
export class UsuarioController {

    constructor(@inject(UsuarioService) private service: UsuarioService) {}

    public existsEmail = async (req: Request, res: Response) => {
        const { email } = req.body;
        const response = await this.service.existsEmail(email);

        return res.status(HttpStatus.OK).json({ data: response });
    }

    public doLogin = async(req: Request, res: Response) => {
        const { email, password } = req.body;

        const user = await this.service.getUser(email, password);

        if (user) {
            const payload: Payload = {
                user,
                exp: Number(environment.EXP)
            }
            const token = JwtHelper.encode(payload);
            const refreshToken = JwtHelper.encodeRefresh(payload);

            const response = {
                token, refreshToken
            };

            return res.status(HttpStatus.OK).json(new ResponseData(response));
        }

        return res.status(HttpStatus.NOT_FOUND).json({ message: "Usuario no encontrado" });
    }

    public registerUser = async (req: Request, res: Response) => {
        const dataUser: UsuarioModel = req.body as UsuarioModel;
        const user = await this.service.registerUser(dataUser);

        if (user) {
            const payload: Payload = {
                user,
                exp: Number(environment.EXP)
            }
            const token = JwtHelper.encode(payload);
            const refreshToken = JwtHelper.encodeRefresh(payload);

            const response = {
                token, refreshToken
            }

            return res.status(HttpStatus.CREATE).json(new ResponseData(response));
        }

        return res.status(HttpStatus.NOT_FOUND).json({ message: "Error al registrar el usuario" });
    }

}
