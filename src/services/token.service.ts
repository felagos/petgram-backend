import { injectable, inject } from "inversify";
import { TokenRepository } from "@repository";
import { BaseSerice } from "./base.service";

@injectable()
export class TokenService extends BaseSerice {

    @inject(TokenRepository) private repository: TokenRepository;

    public async hasToken(email: string) {
        const response = await this.repository.hasToken(email);
        return this.responseOK(response);
    }

    public async saveToken(email: string, refreshToken: string) {
        await this.repository.saveToken(email, refreshToken);
        return this.responseOK("");
    }

    public async updateOrCreateToken(email: string, refreshToken: string) {
        await this.repository.updateOrCreateToken(email, refreshToken);
        return this.responseOK("");
    }

    public async removeToken(email: string) {
        await this.repository.removeToken(email);
        return this.responseOK("");
    }

}