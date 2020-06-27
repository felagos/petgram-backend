import { Usuario } from "@mongo/schemas/usuario.schema";

class UsuarioService {

    public async existsEmail(email: string): Promise<boolean> {
        const usuario = await Usuario.findOne({ email }).exec();
        if (usuario)
            return true;
        return false;
    }

}

export default new UsuarioService();