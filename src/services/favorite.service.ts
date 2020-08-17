import { injectable, inject } from "inversify";
import { FavoriteModel, PetModel } from "@models";
import { FavoriteRepository } from "@repository";
import { BaseSerice } from "./base.service";

@injectable()
export class FavoriteService extends BaseSerice {

    @inject(FavoriteRepository) private favRepository: FavoriteRepository;

    public async addFavorite(token: string, pet: PetModel): Promise<FavoriteModel> {
        const user = await this.getUserFromToken(token);
        return await this.favRepository.addOrCreateFavorite(user._id, pet);
    }

    public async deleteFavorite(token: string, petId: string): Promise<FavoriteModel | null> {
        const user = await this.getUserFromToken(token);
        return await this.favRepository.deleteFavorite(user._id, petId);
    }

    public async getFavoritesIds(token: string) {
        const user = await this.getUserFromToken(token);
        const favoritesPet = await this.favRepository.getFavorites(user._id);

        if (favoritesPet) return favoritesPet.favorites;
        return [];
    }

    public async getAllFavorites(token: string): Promise<PetModel[]> {
        const user = await this.getUserFromToken(token);
        const favoritesPet = await this.favRepository.getFavorites(user._id);

        if (!favoritesPet) return [];
        return favoritesPet.favorites;
    }
}