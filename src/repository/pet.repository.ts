import { Pet } from '@mongo';
import { Types } from 'mongoose';
import { PetModel, PaginationOption, Pagination } from '@models';
import { injectable } from 'inversify';

@injectable()
export class PetRepository {

    public async getPeyByCategoryId(categoriaId: string, options: PaginationOption): Promise<Pagination<PetModel>> {
        const response = await Pet.paginate({ categoriaId }, options);
        return response as Pagination<PetModel>;
    }

    public async getAllPets(options: PaginationOption): Promise<Pagination<PetModel>> {
        const response = await Pet.paginate({}, options);
        return response as Pagination<PetModel>;
    }

    public async getPet(id: string): Promise<PetModel> {
        return await Pet.findOne({ _id: new Types.ObjectId(id) }).exec();
    }

}
