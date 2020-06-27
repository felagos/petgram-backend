import jwt from "jwt-simple";
import { environment } from "@env";
import { Payload } from "@models/payload.model";

export class JwtHelper {

    public static encode(payload: Payload) {
        return jwt.encode(payload, environment.JWT_SECRET, "HS256");
    }

    public static decode(token: string): Payload {
        return jwt.decode(token, environment.JWT_SECRET, false, "HS256") as Payload;
    }
}