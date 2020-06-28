import { Categoria } from "@mongo/schemas/categoria.schema";
import { CategoriaModel } from "@models/categoria.model";
import Cache from '@helpers/node.cache';
import { CacheEnum } from "@enums/cache.enum";

class CategoriaService {

  public async getAll(): Promise<CategoriaModel[]>  {
    const isPresent = Cache.isPresent(CacheEnum.CATEGORIAS);

    if(isPresent) {
      return Cache.getData<CategoriaModel[]>(CacheEnum.CATEGORIAS) || [];
    }

    const data = await Categoria.find({}).exec();
    Cache.setData(CacheEnum.CATEGORIAS, data);
    return data;
  }

}

export default new CategoriaService();
