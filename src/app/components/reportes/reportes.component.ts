import { Component, OnInit } from '@angular/core';
import { ReportesService } from 'src/app/services/reportes.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  constructor(private reportesService: ReportesService) { }

  ngOnInit(): void {
    this.generarGraficos();
  }

  generarGraficos(): void {
    const cotizacionesGlobal = this.reportesService.obtenerDatosGlobales();
    const sucursales = this.reportesService.obtenerSucursales();
    const tendencia = this.reportesService.obtenerTendenciaMensual();

    // Gráfico de barras - Desempeño global
    const ctxGlobal = document.getElementById('graficoGlobal') as HTMLCanvasElement;

    new Chart(ctxGlobal, {
      type: 'line', // Cambiamos el tipo de gráfico a 'line'
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'], // Etiquetas temporales
        datasets: [
          {
            label: 'Rendimiento Global',
            data: [120, 140, 180, 160, 200, 220], // Datos globales
            borderColor: '#4CAF50', // Color de la línea
            tension: 0.4, // Suavidad de la curva
            fill: false, // Evita que el área bajo la curva esté rellena
            borderWidth: 2,
            pointBackgroundColor: '#ffffff', // Color de los puntos
            pointBorderColor: '#4CAF50', // Color del borde de los puntos
            pointRadius: 5, // Tamaño de los puntos
          },
        ],
      },
      options: {
        responsive: true, // Se ajusta al tamaño del contenedor
        plugins: {
          legend: { position: 'top' }, // Posición de la leyenda
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Meses', // Etiqueta para el eje X
            },
          },
          y: {
            beginAtZero: true, // Comienza desde cero
            title: {
              display: true,
              text: 'Total de Cotizaciones', // Etiqueta para el eje Y
            },
          },
        },
      },
    });


    // Gráfico de líneas - Tendencia temporal
    const ctxTendencia = document.getElementById('graficoTendencia') as HTMLCanvasElement;
    new Chart(ctxTendencia, {
      type: 'line',
      data: {
        labels: tendencia.meses,
        datasets: [
          {
            label: 'Veracruz',
            data: tendencia.veracruz,
            borderColor: '#2196F3',
            tension: 0.3,
            fill: false,
          },
          {
            label: 'CDMX',
            data: tendencia.cdmx,
            borderColor: '#FF5722',
            tension: 0.3,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }
}