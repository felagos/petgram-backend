import mongoose, { Schema } from 'mongoose';
import { PetModel } from '@models/pet.model';

const PetSchema = new Schema({
    nombre: Schema.Types.String,
    foto: Schema.Types.String,
    categoriaId: Schema.Types.ObjectId
});

export const Pet = mongoose.model<PetModel>("mascotas", PetSchema);
