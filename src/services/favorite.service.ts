import { injectable, inject } from "inversify";
import { FavoriteModel, PetModel } from "@models";
import { FavoriteRepository, PetRepository } from "@repository";
import { BaseSerice } from "./base.service";

@injectable()
export class FavoriteService extends BaseSerice {

    @inject(FavoriteRepository) private favRepository: FavoriteRepository;
    @inject(PetRepository) private petRepository: PetRepository;

    public async addFavorite(token: string, petId: string): Promise<FavoriteModel> {
        const user = await this.getUserFromToken(token);

        return await this.favRepository.addOrCreateFavorite(user._id, petId);
    }

    public async deleteFavorite(token: string, petId: string): Promise<FavoriteModel> {
        const user = await this.getUserFromToken(token);

        return await this.favRepository.deleteFavorite(user._id, petId);
    }

    public async getFavoritesIds(token: string) {
        const user = await this.getUserFromToken(token);
        const favoritesPet = await this.favRepository.getFavorites(user._id);

        if (favoritesPet)
            return favoritesPet.favorites;

        return [];
    }

    public async getAllFavorites(page: number = 1, token: string) {
        const response: PetModel[] = [];

       const user = await this.getUserFromToken(token);
        const favoritesPet = await this.favRepository.getFavorites(user._id);

        if (favoritesPet) {
            for await (const favId of favoritesPet.favorites) {
                const pet = await this.petRepository.getPet(favId);
                response.push(pet);
            }
        }
        return response;
    }
}