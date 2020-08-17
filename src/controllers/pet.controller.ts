import { Request, Response } from "express";
import { HttpStatus } from "@enums";
import { inject, injectable } from "inversify";
import { PetService } from "@services";
import { ResponseData } from "@models";

@injectable()
export class PetController {

    @inject(PetService) private service: PetService

    public getMascotaByCategoriId = async (req: Request, res: Response): Promise<Response> => {
        const { categoriaId, page } = req.params;

        const response = await this.service.getPeyByCategoryId(categoriaId, page);
        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

    public getAllPetsWithFav = async (req: Request, res: Response) => {
        const { page } = req.params;
        const { authorization = "" } = req.headers;

        const response = await this.service.getAllPetsWithFav(page, authorization);

        return res.status(HttpStatus.OK).json(new ResponseData(response));
    }

}
