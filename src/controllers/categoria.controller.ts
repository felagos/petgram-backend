import { Request, Response } from "express";
import { HttpStatus } from "@enums/http.enum";
import CategoriaService from "@services/categoria.service";
import { ResponseData } from "@models/response.model";

class CategoriaController {

  public async getAll(req: Request, res: Response): Promise<Response> {
    const response = await CategoriaService.getAll();
    return res.status(HttpStatus.OK).json(new ResponseData(response));
  }

}

export default new CategoriaController();
