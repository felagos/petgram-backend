import { Mascota } from '@mongo/schemas/mascota.schema';
import { MascotaModel } from '@models/mascota.model';
import { injectable } from 'inversify';

@injectable()
export class MascotaService {

    public async getMascotaByCategoriId(categoriaId: string): Promise<MascotaModel[]> {
        return Mascota.find({ categoriaId }).exec();
    }

}
