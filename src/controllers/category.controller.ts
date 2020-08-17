import { Request, Response } from "express";
import { HttpStatus } from "@enums";
import { inject, injectable } from "inversify";
import { CategoryService } from "@services";
import { BaseController } from "./base.controller";

@injectable()
export class CategoryController extends BaseController {

  @inject(CategoryService) private service: CategoryService

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const response = await this.service.getAll();
    return this.responseOK(res, response);
  }

}
