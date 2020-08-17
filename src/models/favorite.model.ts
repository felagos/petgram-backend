import { Document } from 'mongoose';

export interface FavoriteModel extends Document {
    userId: string;
    favorites: string[];
}