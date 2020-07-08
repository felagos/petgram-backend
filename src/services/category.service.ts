import { Category } from "@mongo/schemas/category.schema";
import { CategoryModel } from "@models/category.model";
import Cache from '@helpers/node.cache';
import { CacheEnum } from "@enums/cache.enum";
import { injectable } from "inversify";

@injectable()
export class CategoryService {

  public async getAll(): Promise<CategoryModel[]>  {
    const isPresent = Cache.isPresent(CacheEnum.CATEGORIAS);

    if(isPresent) {
      return Cache.getData<CategoryModel[]>(CacheEnum.CATEGORIAS) || [];
    }

    const data = await Category.find({}).exec();
    Cache.setData(CacheEnum.CATEGORIAS, data);
    return data;
  }

}
