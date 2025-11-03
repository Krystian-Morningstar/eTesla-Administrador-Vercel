import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../services/cuenta.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nombreUsuario: string = '';

  constructor(private cuentaService: CuentaService) {}

  ngOnInit(): void {
    this.cuentaService.getUsuarioActual().subscribe(
      (data) => {
        this.nombreUsuario = data.nombre;
      },
      (err) => {
        this.nombreUsuario = '';
      }
    );
  }
}
