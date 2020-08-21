import { UserModel, Payload, TokenModel } from "@models";
import { injectable, inject } from "inversify";
import { UserRepository } from "@repository";
import { TokenService } from "@services";
import { BaseSerice } from "./base.service";

@injectable()
export class UserService extends BaseSerice {

    @inject(UserRepository) private repository: UserRepository;
    @inject(TokenService) private tokenService: TokenService;

    public async existsEmail(email: string) {
        const response = await this.repository.existsEmail(email);
        return this.responseOK(response);
    }

    private registerUser(usuario: UserModel) {
        return this.repository.registerUser(usuario);
    }

    public getUser(email: string, password: string) {
        return this.repository.getUser(email, password);
    }

    public async getByEmail(email: string) {
        const response = await this.repository.getByEmail(email);
        return this.responseOK(response);
    }

    public async doLogin(email: string, password: string) {
        const user = await this.getUser(email, password);

        if (user) {
            const payload: Payload = {
                user
            }
            const token = this.jwtHelper.encode(payload);
            const refreshToken = this.jwtHelper.encodeRefresh(payload);

            await this.tokenService.updateOrCreateToken(user.email, refreshToken);

            const response: TokenModel = {
                token, refreshToken
            };

            return this.responseOK(response);
        }

        return this.responseNotFound();
    }

    public async doRegisterUser(usuario: UserModel) {
        const user = await this.registerUser(usuario);

        if (user) {
            const payload: Payload = {
                user
            }
            const token = this.jwtHelper.encode(payload);
            const refreshToken = this.jwtHelper.encodeRefresh(payload);

            await this.tokenService.saveToken(user.email, refreshToken);

            const response: TokenModel = {
                token, refreshToken
            }

            return this.responseOK(response);
        }

        return this.responseNotFound();
    }

    public generateToken(user: UserModel) {
        const newPayload: Payload = {
            user
        };
        const response = this.jwtHelper.encode(newPayload);

        return this.responseOK(response);
    }

}
