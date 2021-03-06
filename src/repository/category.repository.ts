import { Category } from "@mongo";
import { CategoryModel } from "@models";
import { injectable } from "inversify";

@injectable()
export class CategoryRepository {

  public async getAll(): Promise<CategoryModel[]> {
    return await Category.find({}).exec();
  }

}
