import { injectable } from "inversify";
import { Favorite } from "@mongo";
import { FavoriteModel, PaginationOption, Pagination } from "@models";

@injectable()
export class FavoriteRepository {

    public async addOrCreateFavorite(id: string, petId: string): Promise<FavoriteModel> {
        let fav = await Favorite.findOne({ userId: id }).exec();

        if (fav === null) {
            fav = await new Favorite({ userId: id, favorites: [petId] }).save();
        }
        else {
            fav.favorites.push(petId);
            fav.save();
        }

        return fav as FavoriteModel;
    }

    public async deleteFavorite(userId: string, petId: string): Promise<FavoriteModel> {
        const fav = await Favorite.findOne({ userId }).exec();

        const idsFavorites = fav.favorites.filter((id: string) => id !== petId);

        fav.favorites = idsFavorites;
        fav.save();

        return fav as FavoriteModel;
    }

    public async getFavorities(userId: string): Promise<FavoriteModel> {
        const response = await Favorite.findOne({ userId });
        return response as FavoriteModel;
    }

    public async getFavoritiesPage(userId: string, options: PaginationOption): Promise<Pagination<FavoriteModel>> {
        const response = await Favorite.paginate({ userId }, options);
        return response as Pagination<FavoriteModel>;
    }


}