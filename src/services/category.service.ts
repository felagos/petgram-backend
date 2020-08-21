import { CategoryModel, ResponseMessage } from "@models";
import { injectable, inject } from "inversify";
import { CategoryRepository } from "@repository";
import { BaseSerice } from "./base.service";

@injectable()
export class CategoryService extends BaseSerice {

  @inject(CategoryRepository) private repository: CategoryRepository;

  public async getAll(): Promise<ResponseMessage<CategoryModel[]>> {
    const response = await this.repository.getAll();
    return this.responseOK(response);
  }

}
