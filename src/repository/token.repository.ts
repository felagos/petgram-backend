import { injectable } from "inversify";
import { Token } from "@mongo";

@injectable()
export class TokenRepository {

    public async hasToken(email: string): Promise<boolean> {
        const tokenDB = await Token.findOne({ email }).exec();
        return tokenDB ? true : false;
    }

    public async saveToken(email: string, refreshToken: string): Promise<void> {
        const token = new Token({ email, refreshToken });
        token.save();
    }

    public async updateOrCreateToken(email: string, refreshToken: string): Promise<void> {
        await Token.updateOne({ email }, { refreshToken }, { upsert: true }).exec();
    }

    public async removeToken(email: string): Promise<void> {
        await Token.deleteOne({ email }).exec();
    }

}