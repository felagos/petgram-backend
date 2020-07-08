import { Document } from 'mongoose';

export interface PetModel extends Document {
    nombre: string;
    foto: string;
    categoriaId: string;
}