import { Mascota } from '@mongo/schemas/mascota.schema';
import { MascotaModel } from '@models/mascota.model';

class MascotaService {

    public async getMascotaByCategoriId(categoriaId: string): Promise<MascotaModel[]> {
        return Mascota.find({ categoriaId }).exec();
    }

}

export default new MascotaService();