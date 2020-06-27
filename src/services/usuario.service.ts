import { Usuario } from "@mongo/schemas/usuario.schema";
import { UsuarioModel } from "@models/usuario.model";
import { BcryptHelper } from "@helpers/bcrypt.helper";

class UsuarioService {

    public async existsEmail(email: string): Promise<boolean> {
        const usuario = await Usuario.findOne({ email }).exec();
        if (usuario)
            return true;
        return false;
    }

    public async registerUser(usuario: UsuarioModel): Promise<UsuarioModel | null> {
        const passwordHash = await BcryptHelper.encrypt(usuario.password);
        const user = new Usuario({ email: usuario.email, password: passwordHash, nombre: usuario.nombre, fechaRegistro: Date.now() });
        return await user.save();
    }

    public async getUser(email: string, password: string): Promise<UsuarioModel | null> {
        const user = await Usuario.findOne({ email }).exec();

        if (user === null)
            return null;

        const samePassword = await BcryptHelper.compare(password, user.password);

        if (samePassword) {
            return user;
        }

        return null;
    }

}

export default new UsuarioService();