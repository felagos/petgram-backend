import mongoose, { Schema } from 'mongoose';
import { UsuarioModel } from '@models/usuario.model';

const UsuarioSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: Schema.Types.String,
    nombre: Schema.Types.String,
    apellido: Schema.Types.String
});

export const Usuario = mongoose.model<UsuarioModel>("usuarios", UsuarioSchema);
