import { Response } from "express";
import { HttpStatus } from "@enums";
import { ResponseData } from "@models";
import { injectable } from "inversify";

@injectable()
export class BaseController {

    protected responseOK<T>(res: Response, data: T) {
        return res.status(HttpStatus.OK).json(new ResponseData(data));
    }

}