import mongoose, { Schema } from 'mongoose';
import { CategoriaModel } from '@models/categoria.model';

const CategoriaSchema = new Schema({
    nombre: Schema.Types.String,
    emoji: Schema.Types.String
});

export const Categoria = mongoose.model<CategoriaModel>("categorias", CategoriaSchema);