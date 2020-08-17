import { Request, Response } from "express";
import { injectable } from "inversify";
import { BaseController } from "./base.controller";

@injectable()
export class PingController extends BaseController {

    public doPing = (req: Request, res: Response): Response => {
        return this.responseOK(res, "Server up !");
    }

}
