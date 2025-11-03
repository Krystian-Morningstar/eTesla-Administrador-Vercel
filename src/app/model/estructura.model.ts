export interface Estructura {
    id_estructura: number;
    nombre: string;
    marca: string;
    precio: number;
    garantia: string;
    origen: string;
    image: string | ArrayBuffer | null;
    ficha_tecnica_pdf: string;
    activo: boolean;
}
