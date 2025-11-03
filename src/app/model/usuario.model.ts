export interface Usuario {
    id_usuario: number;
    nombre: string;
    correo: string;
    telefono: string;
    contrasena: string;
    id_rol: number;
    id_sucursal: number;
    activo: boolean;
}
