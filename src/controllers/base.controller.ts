import { Response } from "express";
import { ResponseData } from "@models";
import { injectable } from "inversify";

@injectable()
export class BaseController {

    protected getResponse<T>(res: Response, data: any): Response<T> {
        return res.status(data.code).json(new ResponseData(data.data));
    }

}