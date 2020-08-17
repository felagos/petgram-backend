import { PetModel, PaginationOption, Pagination } from '@models';
import { injectable, inject } from 'inversify';
import { PetRepository } from '@repository';

@injectable()
export class PetService {

    constructor(@inject(PetRepository) private repository: PetRepository) { }

    public getPeyByCategoryId(categoriaId: string, page: string = "1"): Promise<Pagination<PetModel>> {
        const options: PaginationOption = {
            page: parseInt(page)
        };

        return this.repository.getPeyByCategoryId(categoriaId, options);
    }

    public getAllPets(page: string = "1"): Promise<Pagination<PetModel>> {
        const options: PaginationOption = {
            page: parseInt(page)
        };

        return this.repository.getAllPets(options);
    }

}
