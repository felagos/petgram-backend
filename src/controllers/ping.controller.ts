import { Request, Response } from "express";
import { injectable } from "inversify";
import { BaseController } from "./base.controller";
import { ResponseMessage } from "@models";

@injectable()
export class PingController extends BaseController {

    public doPing = (req: Request, res: Response): Response => {
        return this.getResponse(res, new ResponseMessage(200, "Server up !"));
    }

}
