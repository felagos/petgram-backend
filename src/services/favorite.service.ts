import { injectable, inject } from "inversify";
import { FavoriteModel, PetModel, ResponseMessage } from "@models";
import { FavoriteRepository } from "@repository";
import { BaseSerice } from "./base.service";

@injectable()
export class FavoriteService extends BaseSerice {

    @inject(FavoriteRepository) private favRepository: FavoriteRepository;

    public async addOrCreateFavorite(token: string, pet: PetModel) {
        const user = await this.getUserFromToken(token);
        const response = await this.favRepository.addOrCreateFavorite(user._id, pet);
        return this.responseOK(response);
    }

    public async deleteFavorite(token: string, petId: string) {
        const user = await this.getUserFromToken(token);
        const response = await this.favRepository.deleteFavorite(user._id, petId);
        return this.responseOK(response);
    }

    public async getFavoritesIds(token: string) {
        const user = await this.getUserFromToken(token);
        const favoritesPet = await this.favRepository.getFavorites(user._id);

        return this.responseOK(favoritesPet);
    }

    public async getAllFavorites(token: string) {
        const user = await this.getUserFromToken(token);
        const favoritesPet = await this.favRepository.getFavorites(user._id);

        return this.responseOK(favoritesPet);
    }
}