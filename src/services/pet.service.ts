import { Pet } from '@mongo';
import { PetModel, PaginationOption, Pagination } from '@models';
import { injectable } from 'inversify';

@injectable()
export class PetService {

    public async getPeyByCategoryId(categoriaId: string, options: PaginationOption): Promise<Pagination<PetModel>> {
        const response = await Pet.paginate({ categoriaId }, options);
        return response as Pagination<PetModel>;
    }

    public async getAllPets(options: PaginationOption): Promise<Pagination<PetModel>> {
        const response = await Pet.paginate({}, options);
        return response as Pagination<PetModel>;
    }

}
