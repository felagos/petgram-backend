import { Document } from 'mongoose';

export interface MascotaModel extends Document {
    nombre: string;
    foto: string;
    categoriaId: string;
}