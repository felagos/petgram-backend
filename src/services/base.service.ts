import { JwtHelper } from "@helpers";
import { inject, injectable } from "inversify";
import { UserRepository } from "@repository";
import { UserModel, EmptyUser } from "src/models";

@injectable()
export class BaseSerice {

    @inject(JwtHelper) private jwtHelper: JwtHelper;
    @inject(UserRepository) private userRepository: UserRepository;

    protected async getUserFromToken(token: string): Promise<UserModel | EmptyUser> {
        if (token === "")
            return { _id: "" };

        const payload = this.jwtHelper.decode(token);
        return await this.userRepository.getByEmail(payload.user.email);
    }

}