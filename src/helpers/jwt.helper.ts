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

    public decodeRefresh(token: string): Payload {
        return jwt.verify(token, environment.JWT_SECRET_REFRESH, { ignoreExpiration: true }) as Payload;
    }

    public isValid(token: string, isRefresh: boolean = false): boolean {
        try {
            if (!isRefresh) this.decode(token);
            else this.decodeRefresh(token);
            return true;
        } catch (e) {
            return false;
        }
    }
}