import { Request, Response } from "express";
import { HttpStatus } from "@enums/http.eum";
import MascotaService from "@services/mascota.service";

class MascotaController {

    public async getMascotaByCategoriId(req: Request, res: Response): Promise<Response> {
        const { categoriaId } = req.params;
        const response = await MascotaService.getMascotaByCategoriId(categoriaId);
        return res.status(HttpStatus.OK).json({ data: response });
    }

}

export default new MascotaController();
