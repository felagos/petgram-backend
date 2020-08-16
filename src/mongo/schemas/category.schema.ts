import mongoose, { Schema } from 'mongoose';
import { CategoryModel } from '@models';

const CategorySchema = new Schema({
    nombre: Schema.Types.String,
    emoji: Schema.Types.String,
    foto: Schema.Types.String
});

export const Category = mongoose.model<CategoryModel>("categorias", CategorySchema);
