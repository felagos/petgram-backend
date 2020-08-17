export interface UserModel {
    _id: string;
    email: string;
    password: string;
    nombre: string;
    foto: string;
    fechaRegistro?: Date | null;
}