import bcypt from "bcrypt";

export const encrypt = (data: string, salt = 10) => {
    return bcypt.hash(data, salt);
}

export const compare = (data: string, hashed: string) => {
    return bcypt.compare(data, hashed);
}