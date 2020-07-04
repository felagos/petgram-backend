import { Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export class PingController {

    public doPing = (req: Request, res: Response): Response => {
        return res.status(200).json({ data: "Server up !" });
    }

}
