import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: Schema.Types.String,
    nombre: Schema.Types.String,
    fechaRegistro: Schema.Types.Date
});

export const User = mongoose.model("usuarios", UserSchema);
