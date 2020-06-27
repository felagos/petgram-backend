import dotenv from 'dotenv';
dotenv.config();

export const environment  = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET || "123",
    EXP: process.env.EXP || "18000000"
}
