import dotenv from 'dotenv';
dotenv.config();

export const environment  = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET || "123",
    JWT_SECRET_REFRESH: process.env.JWT_SECRET_REFRESH || "123",
    EXP: process.env.EXP || "18000000",
    EXP_CACHE: process.env.EXP_CACHE,
}
