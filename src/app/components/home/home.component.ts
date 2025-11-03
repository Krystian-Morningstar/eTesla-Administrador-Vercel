import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { PanelesService } from 'src/app/services/paneles.service';
import { InversoresService } from 'src/app/services/inversores.service';
import { EstructurasService } from 'src/app/services/estructuras.service';
import { AccesosService } from 'src/app/services/accesos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  precioDolar: string = 'Cargando...';
  fechaActualizacion: string = '';

  panelesActivos: number = 0;
  inversoresActivos: number = 0;
  estructurasActivas: number = 0;
  usuariosActivos: number = 0;

  constructor(
    private homeService: HomeService,
    private panelesService: PanelesService,
    private inversoresService: InversoresService,
    private estructurasService: EstructurasService,
    private accesosService: AccesosService
  ) { }

  ngOnInit(): void {
    this.PrecioDolar();
    this.contarPanelesActivos();
    this.contarInversoresActivos();
    this.contarEstructurasActivas();
    this.contarUsuariosActivos();
  }
  
  contarUsuariosActivos(): void {
    this.accesosService.getUsuarios().subscribe(
      (usuarios) => {
        this.usuariosActivos = usuarios.filter((u: any) => u.activo).length;
      }
    );
  }

  PrecioDolar(): void {
    this.homeService.getPrecioDolar().subscribe(
      (precio) => {
        this.precioDolar = precio;
        this.fechaActualizacion = new Date().toLocaleString('es-MX', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        });
      }
    );
  }

  contarPanelesActivos(): void {
    this.panelesService.getPaneles().subscribe(
      (paneles) => {
        this.panelesActivos = paneles.filter((p: any) => p.activo).length;
      }
    );
  }

  contarInversoresActivos(): void {
    this.inversoresService.getInversores().subscribe(
      (inversores) => {
        this.inversoresActivos = inversores.filter((i: any) => i.activo).length;
      }
    );
  }

  contarEstructurasActivas(): void {
    this.estructurasService.getEstructuras().subscribe(
      (estructuras) => {
        this.estructurasActivas = estructuras.filter((e: any) => e.activo).length;
      }
    );
  }
}