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

    public async getFavoritiesIds(token: string) {
        const user = await this.getUserFromToken(token);
        const favoritiesPet = await this.favRepository.getFavorities(user._id);

        if (favoritiesPet)
            return favoritiesPet.favorites;

        return [];
    }

    public async getAllFavorities(page: number = 1, token: string) {
        const response: PetModel[] = [];

       const user = await this.getUserFromToken(token);
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