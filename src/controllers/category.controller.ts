import { Request, Response } from "express";
import { HttpStatus } from "@enums/http.enum";
import { ResponseData } from "@models/response.model";
import { inject, injectable } from "inversify";
import { CategoryService } from "@services/category.service";

@injectable()
export class CategoryController {

  constructor(@inject(CategoryService) private service: CategoryService){}

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.getAll();
    return res.status(HttpStatus.OK).json(new ResponseData(response));
  }

}
