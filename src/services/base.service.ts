import { JwtHelper } from "@helpers";
import { inject, injectable } from "inversify";
import { UserRepository } from "@repository";

@injectable()
export class BaseSerice {

    @inject(JwtHelper) private jwtHelper: JwtHelper;
    @inject(UserRepository) private userRepository: UserRepository;

    protected async getUserFromToken(token: string) {
        if (token === "")
            return null;

        const payload = this.jwtHelper.decode(token);
        return await this.userRepository.getByEmail(payload.user.email);
    }

}