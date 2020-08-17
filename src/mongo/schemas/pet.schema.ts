import mongoose, { Schema } from 'mongoose';
import mongoosePaginator from 'mongoose-paginate-v2';

export const PetSchema = new Schema({
    nombre: Schema.Types.String,
    foto: Schema.Types.String,
    categoriaId: Schema.Types.ObjectId
});

PetSchema.plugin(mongoosePaginator);

export const Pet = mongoose.model("mascotas", PetSchema);
