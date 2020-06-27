import UsuarioService from '@services/usuario.service';
import { Request, Response } from 'express';
import { HttpStatus } from '@enums/http.enum';

class UsuarioController {

    public async existsEmail(req: Request, res: Response) {
        const { email } = req.body;
        const response = await UsuarioService.existsEmail(email);

        return res.status(HttpStatus.OK).json({ data: response });
    }

}

export default new UsuarioController();