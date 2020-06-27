import bcypt from "bcrypt";

export class BcryptHelper {

    public static encrypt(data: string, salt = 10): Promise<string> {
        return bcypt.hash(data, salt);
    }

    public static compare(data: string, hashed: string): Promise<boolean> {
        return bcypt.compare(data, hashed);
    }
}