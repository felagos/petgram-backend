import { Document } from 'mongoose';
import { PetModel } from '@models';

export interface FavoriteModel extends Document {
    userId: string;
    favorites: PetModel[];
}