import { PetModel, PaginationOption, Pagination } from '@models';
import { injectable, inject } from 'inversify';
import { PetRepository, FavoriteRepository } from '@repository';
import { BaseSerice } from './base.service';

@injectable()
export class PetService extends BaseSerice {

    constructor(@inject(PetRepository) private repository: PetRepository,
        @inject(FavoriteRepository) private favRepository: FavoriteRepository) {
        super();
    }

    public getPeyByCategoryId(categoriaId: string, page: string = "1"): Promise<Pagination<PetModel>> {
        const options: PaginationOption = {
            page: parseInt(page)
        };

        return this.repository.getPeyByCategoryId(categoriaId, options);
    }

    public async getAllPetsWithFav(page: string = "1", token: string): Promise<Pagination<PetModel>> {
        const options: PaginationOption = {
            page: parseInt(page)
        };

        let favs: string[] = [];

        const user = await this.getUserFromToken(token);
        if (user) {
            const favsPets = await this.favRepository.getFavorities(user._id);
            favs = favsPets ? favsPets.favorites : [];
        }

        const pets = await this.repository.getAllPets(options);
        pets.docs = pets.docs.map(pet => ({
            _id: pet._id,
            nombre: pet.nombre,
            foto: pet.foto,
            categoriaId: pet.categoriaId,
            favorite: favs.includes(pet._id)
        }));

        return pets;

    }

}
