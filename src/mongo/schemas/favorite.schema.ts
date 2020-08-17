import mongoose, { Schema } from 'mongoose';
import { PetSchema } from '@mongo';
import { FavoriteModel } from '@models';

const FavoriteSchema = new Schema({
    userId: Schema.Types.String,
    favorites: [PetSchema],
});

export const Favorite = mongoose.model<FavoriteModel>("favoritos", FavoriteSchema);
