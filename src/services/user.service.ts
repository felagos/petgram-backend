import { UserModel, Payload, TokenModel } from "@models";
import { injectable, inject } from "inversify";
import { UserRepository } from "@repository";
import { JwtHelper } from "@helpers";
import { TokenService } from "@services";

@injectable()
export class UserService {

    @inject(UserRepository) private repository: UserRepository;
    @inject(JwtHelper) private jwtHelper: JwtHelper;
    @inject(TokenService) private tokenService: TokenService;

    public existsEmail(email: string): Promise<boolean> {
        return this.repository.existsEmail(email);
    }

    private registerUser(usuario: UserModel): Promise<UserModel | null> {
        return this.repository.registerUser(usuario);
    }

    public getUser(email: string, password: string): Promise<UserModel | null> {
        return this.repository.getUser(email, password);
    }

    public getByEmail(email: string): Promise<UserModel> {
        return this.repository.getByEmail(email);
    }

    public async doLogin(email: string, password: string): Promise<TokenModel | null> {
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

            return response;
        }

        return null;
    }

    public async doRegisterUser(usuario: UserModel): Promise<TokenModel | null> {
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

            return response;
        }

        return null;
    }

    public generateToken(user: UserModel) {
        const newPayload: Payload = {
            user
        };
        return this.jwtHelper.encode(newPayload);
    }

}
