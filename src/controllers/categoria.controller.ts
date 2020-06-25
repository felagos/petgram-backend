import { Request, Response } from "express";
import CategoriaService from "src/service/categoria.service";
import { HttpStatus } from "@enums/http.eum";

class CategoriaController {

  public async getAll(req: Request, res: Response): Promise<Response> {
    const response = await CategoriaService.getAll();
    return res.status(HttpStatus.OK).json({ data: response });
  }

}

export default new CategoriaController();
