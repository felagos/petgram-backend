import { Document } from 'mongoose';

export interface UsuarioModel extends Document {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
}