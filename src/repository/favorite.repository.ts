import { injectable } from "inversify";
import { Favorite } from "@mongo";
import { FavoriteModel, PetModel } from "@models";

@injectable()
export class FavoriteRepository {

    public async addOrCreateFavorite(id: string, pet: PetModel): Promise<FavoriteModel> {
        let fav = await Favorite.findOne({ userId: id }).exec();

        if (fav === null) {
            fav = await this.createFavorite(id, pet);
        }
        else {
            this.updateFavorite(fav, pet);
        }

        return fav;
    }

    private async createFavorite(id: string, pet: PetModel) {
        return await new Favorite({ userId: id, favorites: [pet] }).save();
    }

    private updateFavorite(fav: FavoriteModel, pet: PetModel) {
        fav.favorites.push(pet);
        fav.save();
    }

    public async deleteFavorite(userId: string, petId: string): Promise<FavoriteModel | null> {
        const fav = await Favorite.findOne({ userId }).exec();

        if (!fav) return null;

        const idsFavorites = fav.favorites.filter((pet: PetModel) => pet._id !== petId);

        fav.favorites = idsFavorites;
        fav.save();

        return fav;
    }

    public async getFavorites(userId: string): Promise<FavoriteModel | null> {
        return await Favorite.findOne({ userId }).exec();
    }

    public async getFavoritesIds(userId: string): Promise<string[]> {
        const response = await Favorite.findOne({ userId });

        if (!response) return [];
        return response.favorites.map((pet: PetModel) => pet._id);
    }

}