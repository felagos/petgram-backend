import { injectable } from "inversify";
import { Favorite } from "@mongo";
import { FavoriteModel, PetModel } from "@models";

@injectable()
export class FavoriteRepository {

    public async addOrCreateFavorite(id: string, pet: PetModel): Promise<FavoriteModel> {
        const fav = await Favorite.findOne({ userId: id }).exec();
        return fav === null ? await this.createFavorite(id, pet) : await this.updateFavorite(fav, pet);
    }

    private async createFavorite(id: string, pet: PetModel) {
        return await new Favorite({ userId: id, favorites: [pet] }).save();
    }

    private async updateFavorite(fav: FavoriteModel, pet: PetModel) {
        fav.favorites.push(pet);
        return await fav.save();
    }

    public async deleteFavorite(userId: string, petId: string): Promise<FavoriteModel | null> {
        const fav = await Favorite.findOne({ userId }).exec();

        if (!fav) return null;

        const idsFavorites = fav.favorites.filter(pet => String(pet._id) !== petId);
        fav.favorites = idsFavorites;

        return await fav.save();
    }

    public async getFavorites(userId: string): Promise<PetModel[]> {
        const response = await Favorite.findOne({ userId }).exec();
        return response ? response.favorites : [];
    }

    public async getFavoritesIds(userId: string): Promise<string[]> {
        const response = await Favorite.findOne({ userId });

        if (!response) return [];
        return response.favorites.map(pet => pet._id);
    }

}