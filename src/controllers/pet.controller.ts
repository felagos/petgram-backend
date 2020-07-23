import { Request, Response } from "express";
import { HttpStatus } from "@enums/http.enum";
import { ResponseData } from "@models/response.model";
import { inject, injectable } from "inversify";
import { PetService } from "@services/pet.service";

@injectable()
export class PetController {

    constructor(@inject(PetService) private service: PetService) {}

    public getMascotaByCategoriId = async (req: Request, res: Response): Promise<Response> => {
        const { categoriaId } = req.params;
        const response = await this.service.getMascotaByCategoriId(categoriaId);
        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

    public getAllPets = async (req: Request, res: Response) => {
        const response = await this.service.getAllPets();
        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

}
