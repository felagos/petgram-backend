import mongoose, { Schema } from 'mongoose';
import { MascotaModel } from '@models/mascota.model';

const MascotasSchema = new Schema({
    nombre: Schema.Types.String,
    foto: Schema.Types.String,
    categoriaId: Schema.Types.String
});

export const Mascota = mongoose.model<MascotaModel>("mascotas", MascotasSchema);
