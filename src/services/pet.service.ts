import { Pet } from '@mongo/schemas/pet.schema';
import { PetModel } from '@models/pet.model';
import { injectable } from 'inversify';
import { Types, mongo } from 'mongoose'

@injectable()
export class PetService {

    public async getMascotaByCategoriId(categoriaId: string): Promise<PetModel[]> {
        return Pet.find({ categoriaId }).exec();
    }

}
