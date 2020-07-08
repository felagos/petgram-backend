import { User } from "@mongo/schemas/user.schema";
import { UserModel } from "@models/user.model";
import { BcryptHelper } from "@helpers/bcrypt.helper";
import { injectable } from "inversify";

@injectable()
export class UserService {

    private projectUser = {  email: 1, nombre: 1, foto: 1, password: 1, _id: 0 };

    public async existsEmail(email: string): Promise<boolean> {
        const usuario = await User.findOne({ email }).exec();
        if (usuario)
            return true;
        return false;
    }

    public async registerUser(usuario: UserModel): Promise<UserModel | null> {
        const passwordHash = await BcryptHelper.encrypt(usuario.password);
        const user = new User({ email: usuario.email, password: passwordHash, nombre: usuario.nombre, fechaRegistro: Date.now() });
        const newUsuer =  await user.save();

        delete user._id;
        delete user.__v;
        delete user.password;
        delete user.fechaRegistro;

        return newUsuer;
    }

    public async getUser(email: string, password: string): Promise<UserModel | null> {
        const user = await User.findOne({ email }, this.projectUser).exec();

        if (user === null)
            return null;

        const samePassword = await BcryptHelper.compare(password, user.password);

        if (samePassword) {
            delete user._id;
            delete user.__v;
            delete user.password;
            delete user.fechaRegistro;
            return user;
        }

        return null;
    }

}
