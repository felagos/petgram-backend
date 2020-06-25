import { Categoria } from "@mongo/schemas/categoria.schema";
import { CategoriaModel } from "@models/categoria.model";

class CategoriaService {

  public getAll(): Promise<CategoriaModel[]>  {
    return Categoria.find({}).exec();
  }

}

export default new CategoriaService();
