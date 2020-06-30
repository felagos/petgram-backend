import { Request, Response } from "express";
import { HttpStatus } from "@enums/http.enum";
import MascotaService from "@services/mascota.service";
import { ResponseData } from "@models/response.model";

class MascotaController {

    public async getMascotaByCategoriId(req: Request, res: Response): Promise<Response> {
        const { categoriaId } = req.params;
        const response = await MascotaService.getMascotaByCategoriId(categoriaId);
        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

}

export default new MascotaController();
