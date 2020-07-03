import UsuarioService from '@services/usuario.service';
import { Request, Response } from 'express';
import { HttpStatus } from '@enums/http.enum';
import { Payload } from '@models/payload.model';
import { environment } from '@env';
import { JwtHelper } from '@helpers/jwt.helper';
import { UsuarioModel } from '@models/usuario.model';
import { ResponseData } from '@models/response.model';

class UsuarioController {

    public async existsEmail(req: Request, res: Response) {
        const { email } = req.body;
        const response = await UsuarioService.existsEmail(email);

        return res.status(HttpStatus.OK).json({ data: response });
    }

    public async doLogin(req: Request, res: Response) {
        const { email, password } = req.body;

        const user = await UsuarioService.getUser(email, password);

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

    public async registerUser(req: Request, res: Response) {
        const dataUser: UsuarioModel = req.body as UsuarioModel;
        const user = await UsuarioService.registerUser(dataUser);

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

export default new UsuarioController();