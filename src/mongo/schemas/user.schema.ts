import mongoose, { Schema } from 'mongoose';
import { UserModel } from '@models/user.model';

const UserSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true
    },
    password: Schema.Types.String,
    nombre: Schema.Types.String,
    fechaRegistro: Schema.Types.Date
});

export const User = mongoose.model<UserModel>("usuarios", UserSchema);
