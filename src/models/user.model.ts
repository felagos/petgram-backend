import { Document } from 'mongoose';

export interface UserModel extends Document {
    email: string;
    password: string;
    nombre: string;
    foto: string;
    fechaRegistro?: Date;
}