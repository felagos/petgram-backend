import { Document } from 'mongoose';

export interface CategoryModel extends Document {
    nombre: string;
    emoji: string;
    foto: string;
}