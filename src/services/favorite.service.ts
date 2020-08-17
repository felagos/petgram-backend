import { injectable, inject } from "inversify";
import { FavoriteModel, PetModel } from "@models";
import { FavoriteRepository, PetRepository } from "@repository";
import { JwtHelper } from "@helpers";
import { UserService } from "@services";

@injectable()
export class FavoriteService {

    constructor(@inject(FavoriteRepository) private favRepository: FavoriteRepository,
    @inject(PetRepository) private petRepository: PetRepository,
        @inject(JwtHelper) private jwtHelper: JwtHelper,
        @inject(UserService) private userService: UserService) { }

    public async addFavorite(token: string, petId: string): Promise<FavoriteModel> {
        const payload = this.jwtHelper.decode(token);
        const user = await this.userService.getByEmail(payload.user.email);

        return await this.favRepository.addFavorite(user._id, petId);
    }

    public async deleteFavorite(token: string, petId: string): Promise<FavoriteModel> {
        const payload = this.jwtHelper.decode(token);
        const user = await this.userService.getByEmail(payload.user.email);

        return await this.favRepository.deleteFavorite(user._id, petId);
    }

    public async getFavoritiesIds(token: string) {
        const payload = this.jwtHelper.decode(token, true);
        const user = await this.userService.getByEmail(payload.user.email);
        const favoritiesPet = await this.favRepository.getFavorities(user._id);

        if(favoritiesPet)
            return favoritiesPet.favorites;
        return [];
    }

    public async getAllFavorities(token: string) {
        const response: PetModel[] = [];

        const payload = this.jwtHelper.decode(token);
        const user = await this.userService.getByEmail(payload.user.email);
        const favoritiesPet = await this.favRepository.getFavorities(user._id);

        if (favoritiesPet) {
            for await (const favId of favoritiesPet.favorites) {
                const pet = await this.petRepository.getPet(favId);
                response.push(pet);
            }
        }
        return response;
    }
}