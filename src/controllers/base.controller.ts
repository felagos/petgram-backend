import { Response } from "express";
import { HttpStatus } from "@enums";
import { ResponseData } from "@models";
import { injectable } from "inversify";

@injectable()
export class BaseController {

    protected responseOK<T>(res: Response, data: T) {
        return res.status(HttpStatus.OK).json(new ResponseData(data));
    }

    protected responseCreate<T>(res: Response, data: T) {
        return res.status(HttpStatus.CREATE).json(new ResponseData(data));
    }

    protected responseNotFound(res: Response) {
        return res.status(HttpStatus.NOT_FOUND).send();
    }

}