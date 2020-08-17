import mongoose, { Schema } from 'mongoose';
import { FavoriteModel } from '@models';

const FavoriteSchema = new Schema({
    userId: Schema.Types.String,
    favorites: [Schema.Types.String],
});

export const Favorite = mongoose.model<FavoriteModel>("favoritos", FavoriteSchema);
