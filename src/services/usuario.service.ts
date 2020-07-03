import { Usuario } from "@mongo/schemas/usuario.schema";
import { UsuarioModel } from "@models/usuario.model";
import { BcryptHelper } from "@helpers/bcrypt.helper";

class UsuarioService {

    private projectUser = { _id: 0, email: 1, nombre: 1, __v: 0, password: 0, fechaRegistro: 0 };

    public async existsEmail(email: string): Promise<boolean> {
        const usuario = await Usuario.findOne({ email }).exec();
        if (usuario)
            return true;
        return false;
    }

    public async registerUser(usuario: UsuarioModel): Promise<UsuarioModel | null> {
        const passwordHash = await BcryptHelper.encrypt(usuario.password);
        const user = new Usuario({ email: usuario.email, password: passwordHash, nombre: usuario.nombre, fechaRegistro: Date.now() });
        const newUsuer =  await user.save();

        delete user._id;
        delete user.__v;
        delete user.password;
        delete user.fechaRegistro;

        return newUsuer;
    }

    public async getUser(email: string, password: string): Promise<UsuarioModel | null> {
        const user = await Usuario.findOne({ email }, this.projectUser).exec();

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