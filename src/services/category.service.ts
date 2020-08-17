import { CategoryModel } from "@models";
import { injectable, inject } from "inversify";
import { CategoryRepository } from "@repository";

@injectable()
export class CategoryService {

  constructor(@inject(CategoryRepository) private repository: CategoryRepository) {}

  public getAll(): Promise<CategoryModel[]>  {
    return this.repository.getAll();
  }

}
