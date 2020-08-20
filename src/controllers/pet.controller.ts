import { Request, Response } from "express";
import { HttpStatus } from "@enums";
import { inject, injectable } from "inversify";
import { PetService } from "@services";
import { BaseController } from "./base.controller";

@injectable()
export class PetController extends BaseController {

    @inject(PetService) private service: PetService

    public getPeyByCategoryId = async (req: Request, res: Response): Promise<Response> => {
        const { categoriaId, page } = req.params;

        const response = await this.service.getPeyByCategoryId(categoriaId, page);
        
        return this.responseOK(res, response);
    }

    public getAllPetsWithFav = async (req: Request, res: Response) => {
        const { page } = req.params;
        const { authorization = "" } = req.headers;

        const response = await this.service.getAllPetsWithFav(page, authorization);

        return this.responseOK(res, response);
    }

}
