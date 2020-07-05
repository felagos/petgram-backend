import mongoose, { Schema } from 'mongoose';

const TokenSchema = new Schema({
    email: {
        type: Schema.Types.String,
        required: true
    },
    refreshToken: {
        type: Schema.Types.String,
        required: true
    }
});

export const Token = mongoose.model("tokens", TokenSchema);
