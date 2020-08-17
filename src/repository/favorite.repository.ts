import { injectable } from "inversify";
import { Favorite } from "@mongo";
import { FavoriteModel } from "@models";

@injectable()
export class FavoriteRepository {

    public async addFavorite(id: string, petId: string): Promise<FavoriteModel> {
        return await Favorite.findOneAndUpdate({ userId: id }, {
            $push: {
                favorites: petId
            }
        }, { upsert: true, new: true });
    }

    public async deleteFavorite(id: string, petId: string): Promise<FavoriteModel> {
        return await Favorite.findOneAndUpdate({ userId: id }, {
            $pull: {
                favorites: petId
            }
        }, { upsert: true, new: true });
    }

    public async getFavorities(userId: string): Promise<FavoriteModel | null> {
        return await Favorite.findOne({ userId }).exec();
    }
}