import { Request, Response } from "express";
import { HttpStatus } from "@enums/http.enum";
import { ResponseData } from "@models/response.model";
import { inject, injectable } from "inversify";
import { CategoriaService } from "@services/categoria.service";

@injectable()
export class CategoriaController {

  constructor(@inject(CategoriaService) private service: CategoriaService){}

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.getAll();
    return res.status(HttpStatus.OK).json(new ResponseData(response));
  }

}
