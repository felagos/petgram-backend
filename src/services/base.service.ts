import { JwtHelper } from "@helpers";
import { inject, injectable } from "inversify";
import { UserRepository } from "@repository";
import { UserModel, EmptyUser, ResponseMessage } from "@models";
import { HttpStatus } from "@enums";

@injectable()
export class BaseSerice {

    @inject(JwtHelper) protected jwtHelper: JwtHelper;
    @inject(UserRepository) private userRepository: UserRepository;

    protected async getUserFromToken(token: string): Promise<UserModel | EmptyUser> {
        if (token === "")
            return { _id: "" };

        const payload = this.jwtHelper.decode(token, true);
        return await this.userRepository.getByEmail(payload.user.email);
    }

    protected responseOK<T>(data: T) {
        return new ResponseMessage(HttpStatus.OK, data);
    }

    protected responseCreate<T>( data: T) {
        return new ResponseMessage(HttpStatus.CREATE, data);
    }

    protected responseNotFound() {
        return new ResponseMessage(HttpStatus.NOT_FOUND, "");
    }

}