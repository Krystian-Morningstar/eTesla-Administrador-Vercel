export interface Panel {
    id_panel: number;
    nombre: string;
    marca: string;
    potencia: number;
    precio: number;
    garantia: string;
    origen: string;
    isc: string;
    voc: string;
    vmp: string;
    image: string | ArrayBuffer | null;
    ficha_tecnica_pdf: string;
    activo: boolean;
}
