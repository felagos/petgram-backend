import { Mongoose } from "mongoose";

import { Document } from 'mongoose';

export interface CategoriaModel extends Document {
    nombre: string;
    emoji: string;
}