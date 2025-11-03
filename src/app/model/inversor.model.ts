export interface Inversor {
    id_inversor: number;
    nombre: string;
    marca: string;
    potencia: number;
    precio: number;
    garantia: string;
    origen: string;
    pmin: string;
    pmax: string;
    vmin: string;
    vmax: string;
    isc: string;
    image: string | ArrayBuffer | null;
    ficha_tecnica_pdf: string | ArrayBuffer | null;
    activo: boolean;
}
