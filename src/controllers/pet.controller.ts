import { Request, Response } from "express";
import { HttpStatus } from "@enums";
import { inject, injectable } from "inversify";
import { PetService } from "@services";
import { PaginationOption, ResponseData } from "@models";

@injectable()
export class PetController {

    constructor(@inject(PetService) private service: PetService) { }

    public getMascotaByCategoriId = async (req: Request, res: Response): Promise<Response> => {
        const { categoriaId, page } = req.params;

        const response = await this.service.getPeyByCategoryId(categoriaId, page);
        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

    public getAllPets = async (req: Request, res: Response) => {
        const { page } = req.params;
    
        const response = await this.service.getAllPets(page);

        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }
    
}
