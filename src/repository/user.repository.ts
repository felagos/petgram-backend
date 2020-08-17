import { User } from "@mongo";
import { UserModel } from "@models";
import { BcryptHelper } from "@helpers";
import { injectable } from "inversify";

@injectable()
export class UserRepository {

    private projectUser = { email: 1, nombre: 1, foto: 1, password: 1, _id: 0 };

    public async existsEmail(email: string): Promise<boolean> {
        const usuario = await User.findOne({ email }).exec();
        if (usuario)
            return true;
        return false;
    }

    public async registerUser(usuario: UserModel): Promise<UserModel | null> {
        const passwordHash = await BcryptHelper.encrypt(usuario.password);
        const user = await new User({ email: usuario.email, password: passwordHash, nombre: usuario.nombre, fechaRegistro: Date.now() }).save();;
        const newUsuer = (<any>user) as UserModel;

        delete newUsuer.password;
        delete newUsuer.fechaRegistro;

        return newUsuer;
    }

    public async getUser(email: string, password: string): Promise<UserModel | null> {
        const userDB = await User.findOne({ email }, this.projectUser, { lean: true }).exec();
        const user = (<any>userDB) as UserModel;

        if (user === null)
            return null;

        const samePassword = await BcryptHelper.compare(password, user.password);

        if (samePassword) {
            delete user.password;
            delete user.fechaRegistro;

            return user;
        }

        return null;
    }

    public async getByEmail(email: string): Promise<UserModel> {
        return await User.findOne({ email }).exec();
    }

}
