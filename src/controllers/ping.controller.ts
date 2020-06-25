import { Request, Response } from "express";

class PingController {

    public doPing(req: Request, res: Response): Response {
        return res.status(200).json({ data: "Server up !" });
    }

}

export default new PingController();
