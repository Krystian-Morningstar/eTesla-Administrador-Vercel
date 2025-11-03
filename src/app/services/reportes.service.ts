import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  constructor() {}

  // Datos de ejemplo
  obtenerDatosGlobales() {
    return [120, 70, 50]; // Total Global, Veracruz, CDMX
  }

  obtenerSucursales() {
    return ['Global', 'Veracruz', 'CDMX'];
  }

  obtenerTendenciaMensual() {
    return {
      meses: ['1 Nov', '7 Nov', '14 Nov', '21 Nov', '28 Nov'],
      veracruz: [15, 20, 18, 10, 7], // Datos de ejemplo
      cdmx: [10, 12, 15, 20, 8], // Datos de ejemplo
    };
  }
}
