export interface PetModel {
    _id: string;
    nombre: string;
    foto: string;
    categoriaId: string;
    favorite?: boolean;
}