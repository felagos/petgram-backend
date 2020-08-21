import { PetModel, PaginationOption, Pagination } from '@models';
import { injectable, inject } from 'inversify';
import { PetRepository, FavoriteRepository } from '@repository';
import { BaseSerice } from './base.service';

@injectable()
export class PetService extends BaseSerice {

    @inject(PetRepository) private repository: PetRepository;
    @inject(FavoriteRepository) private favRepository: FavoriteRepository;

    public async getPeyByCategoryId(categoriaId: string, page: string = "1") {
        const options: PaginationOption = {
            page: parseInt(page)
        };

        const response = await this.repository.getPeyByCategoryId(categoriaId, options);

        return this.responseOK(response);
    }

    public async getAllPetsWithFav(page: string = "1", token: string) {
        const options: PaginationOption = {
            page: parseInt(page)
        };

        const user = await this.getUserFromToken(token);
        const favs = await this.favRepository.getFavoritesIds(user._id);

        const pets = await this.repository.getAllPets(options);
        pets.docs = pets.docs.map(pet => ({
            _id: pet._id,
            nombre: pet.nombre,
            foto: pet.foto,
            categoriaId: pet.categoriaId,
            favorite: favs.includes(pet._id),
        }));

        return this.responseOK(pets);
    }

}
