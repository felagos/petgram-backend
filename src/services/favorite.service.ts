import { injectable, inject } from "inversify";
import { FavoriteModel } from "@models";
import { FavoriteRepository } from "@repository";
import { JwtHelper } from "@helpers";
import { UserService } from "@services";

@injectable()
export class FavoriteService {

    constructor(@inject(FavoriteRepository) private repository: FavoriteRepository,
        @inject(JwtHelper) private jwtHelper: JwtHelper,
        @inject(UserService) private userService: UserService) { }

    public async addFavorite(token: string, petId: string): Promise<FavoriteModel> {
        const payload = this.jwtHelper.decode(token);
        const user = await this.userService.getByEmail(payload.user.email);

        return await this.repository.addFavorite(user._id, petId);
    }

    public async deleteFavorite(token: string, petId: string): Promise<FavoriteModel> {
        const payload = this.jwtHelper.decode(token);
        const user = await this.userService.getByEmail(payload.user.email);

        return await this.repository.deleteFavorite(user._id, petId);
    }
}