import { Request, Response } from "express";
import { HttpStatus } from "@enums/http.enum";
import { ResponseData } from "@models/response.model";
import { inject, injectable } from "inversify";
import { MascotaService } from "@services/mascota.service";

@injectable()
export class MascotaController {

    constructor(@inject(MascotaService) private service: MascotaService) {}

    public getMascotaByCategoriId = async (req: Request, res: Response): Promise<Response> => {
        const { categoriaId } = req.params;
        const response = await this.service.getMascotaByCategoriId(categoriaId);
        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

}
