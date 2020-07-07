import { injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "@enums/http.enum";

@injectable()
export class TokenMiddleware {

    public validateToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization;
        console.log("token", token);
        if(!token) {
            return res.sendStatus(HttpStatus.UNAUTHORIZED);
        }

        return next();

    }

}