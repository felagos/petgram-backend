import { Request, Response } from "express";
import { HttpStatus } from "@enums";
import { inject, injectable } from "inversify";
import { CategoryService } from "@services";
import { ResponseData } from "@models";

@injectable()
export class CategoryController {

  @inject(CategoryService) private service: CategoryService

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.getAll();
    return res.status(HttpStatus.OK).json(new ResponseData(response));
  }

}
