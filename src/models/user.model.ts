import { Document } from 'mongoose';

export interface UserModel {
    email: string;
    password: string;
    nombre: string;
    foto: string;
    fechaRegistro?: Date | null;
}