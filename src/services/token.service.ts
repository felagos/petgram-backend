import { injectable, inject } from "inversify";
import { TokenRepository } from "@repository";

@injectable()
export class TokenService {

    @inject(TokenRepository) private repository: TokenRepository;

    public hasToken(email: string): Promise<boolean> {
        return this.repository.hasToken(email);
    }

    public async saveToken(email: string, refreshToken: string): Promise<void> {
        await this.repository.saveToken(email, refreshToken);
    }

    public async updateOrCreateToken(email: string, refreshToken: string): Promise<void> {
        await this.repository.updateOrCreateToken(email, refreshToken);
    }

    public async removeToken(email: string): Promise<void> {
        await this.repository.removeToken(email);
    }

}