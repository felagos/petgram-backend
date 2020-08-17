import mongoose, { Schema } from 'mongoose';

const FavoriteSchema = new Schema({
    userId: Schema.Types.String,
    favorites: [Schema.Types.String],
});

export const Favorite = mongoose.model("favoritos", FavoriteSchema);
