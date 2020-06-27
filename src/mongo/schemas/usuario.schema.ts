import mongoose, { Schema } from 'mongoose';
import { UsuarioModel } from '@models/usuario.model';

const UsuarioSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: Schema.Types.String,
    nombre: Schema.Types.String,
    fechaRegistro: Schema.Types.Date
});

export const Usuario = mongoose.model<UsuarioModel>("usuarios", UsuarioSchema);
