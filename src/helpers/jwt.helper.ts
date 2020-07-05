import jwt from 'jsonwebtoken';
import { environment } from "@env";
import { Payload } from "@models/payload.model";
import { injectable } from 'inversify';

@injectable()
export class JwtHelper {

    public encode(payload: Payload) {
        return jwt.sign(payload, environment.JWT_SECRET, { expiresIn: environment.EXP_TOKEN });
    }

    public encodeRefresh(payload: Payload) {
        return jwt.sign(payload, environment.JWT_SECRET_REFRESH);
    }

    public decode(token: string): Payload {
        return jwt.verify(token, environment.JWT_SECRET) as Payload;
    }

    public isValid(token: string): boolean {
        try {
            this.decode(token);
            return true;
        } catch(e) {
            return false;
        }
    } 
}