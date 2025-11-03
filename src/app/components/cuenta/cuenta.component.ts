import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../services/cuenta.service';
import { AccesosService } from '../../services/accesos.service';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  userProfile: any = {
    nombre: '',
    rol: '',
    telefono: '',
    correo: '',
    direccion: ''
  };
  error: string | null = null;
  roles: any[] = [];
  sucursales: any[] = [];

  constructor(private cuentaService: CuentaService, private accesosService: AccesosService) {}

  ngOnInit(): void {
    // Obtener roles y sucursales primero
    this.accesosService.getRoles().subscribe(
      (rolesData) => {
        this.roles = rolesData;
        this.accesosService.getSucursales().subscribe(
          (sucursalesData) => {
            this.sucursales = sucursalesData;
            // Ahora obtener usuario
            this.cuentaService.getUsuarioActual().subscribe(
              (data: Usuario) => {
                this.userProfile.nombre = data.nombre;
                this.userProfile.telefono = data.telefono;
                this.userProfile.correo = data.correo;
                // Buscar nombre de sucursal y rol
                const sucursal = this.sucursales.find(s => s.id_sucursal === data.id_sucursal);
                this.userProfile.direccion = sucursal ? sucursal.nombre_sucursal : data.id_sucursal;
                const rol = this.roles.find(r => r.id_rol === data.id_rol);
                this.userProfile.rol = rol ? rol.nombre_rol : data.id_rol;
                this.error = null;
              },
              (err) => {
                this.error = 'No se pudo obtener los datos del usuario.';
              }
            );
          },
          (err) => {
            this.error = 'No se pudo obtener la lista de sucursales.';
          }
        );
      },
      (err) => {
        this.error = 'No se pudo obtener la lista de roles.';
      }
    );
  }

  cambiarContrasena() {
    // Lógica para cambiar contraseña
  }

  editarPerfil() {
    // Lógica para editar perfil
  }
}
