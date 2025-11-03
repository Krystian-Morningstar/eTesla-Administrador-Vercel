type ToastType = 'success' | 'error' | 'delete' | 'warning';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { AccesosService } from '../../services/accesos.service';

@Component({
  selector: 'app-accesos',
  templateUrl: './accesos.component.html',
  styleUrls: ['./accesos.component.css']
})
export class AccesosComponent implements OnInit {
  constructor(private accesosService: AccesosService) {}

  ngOnInit(): void {
    this.accesosService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
    this.accesosService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al obtener roles:', error);
      }
    );

    this.accesosService.getSucursales().subscribe(
      (data) => {
        this.sucursales = data;
      },
      (error) => {
        console.error('Error al obtener sucursales:', error);
      }
    );
  }
  showToast = false;
  isSuccess = false;
  toastMessage = '';
  toastType: ToastType = 'success';
  usuarios: any[] = [];
  newUsuario: Usuario = {
    id_usuario: 0,
    nombre: '',
    correo: '',
    telefono: '',
    contrasena: '',
    id_rol: 0,
    id_sucursal: 0,
    activo: true
  };

  refreshUsuarios() {
    this.accesosService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
        this.ordenarUsuarios();
      },
      (error) => {
        console.error('Error al refrescar usuarios:', error);
      }
    );
  }

  reactivarUsuario(usuario: Usuario) {
    this.accesosService.reactivarUsuario(usuario.id_usuario).subscribe(
      (data) => {
        usuario.activo = true;
        this.refreshUsuarios();
        this.showToastMessage('Usuario reactivado correctamente.', 'success');
      },
      (error) => {
        console.error('Error al reactivar usuario:', error);
        this.showToastMessage('Error al reactivar usuario.', 'warning');
      }
    );
  }

  roles: any[] = [];
  sucursales: any[] = [];

  addUsuario() {
    // Adaptar el objeto para que coincida con el backend
    const usuarioPayload = {
      nombre: this.newUsuario.nombre,
      correo: this.newUsuario.correo,
      telefono: this.newUsuario.telefono,
      contrasena: this.newUsuario.contrasena,
      id_rol: Number(this.newUsuario.id_rol),
      id_sucursal: Number(this.newUsuario.id_sucursal),
      activo: true
    };
    console.log('Payload enviado al backend:', usuarioPayload);
    if (this.editingUsuarioId) {
      // Edicion PUT
      this.accesosService.actualizarUsuario(this.editingUsuarioId, usuarioPayload).subscribe(
        (usuarioActualizado) => {
          this.refreshUsuarios();
          this.editingUsuarioId = null;
          this.newUsuario = {
            id_usuario: 0,
            nombre: '',
            correo: '',
            telefono: '',
            contrasena: '',
            id_rol: 0,
            id_sucursal: 0,
            activo: true
          };
          this.showToastMessage('Usuario actualizado correctamente.', 'success');
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
          this.showToastMessage('Error al actualizar usuario.', 'error');
        }
      );
    } else {
      // Creacion POST
      this.accesosService.crearUsuario(usuarioPayload).subscribe(
        (usuarioCreado) => {
          this.refreshUsuarios();
          this.newUsuario = {
            id_usuario: 0,
            nombre: '',
            correo: '',
            telefono: '',
            contrasena: '',
            id_rol: 0,
            id_sucursal: 0,
            activo: true
          };
          this.showToastMessage('Usuario creado correctamente.', 'success');
        },
        (error) => {
          console.error('Error al crear usuario:', error);
          if (error.status === 500 && error.error && error.error.code === '23505') {
            this.showToastMessage('El correo ya está registrado.', 'error');
          } else {
            this.showToastMessage('Error al crear usuario.', 'error');
          }
        }
      );
    }
  }

  editUsuario(usuario: Usuario) {
    this.newUsuario = { ...usuario };
    this.editingUsuarioId = usuario.id_usuario;
  }

  editingUsuarioId: number | null = null;

  deleteUsuario(usuario: Usuario) {
    this.accesosService.SoftDeleteUsuario(usuario.id_usuario).subscribe(
      () => {
        usuario.activo = false;
        this.refreshUsuarios();
        this.showToastMessage('Usuario eliminado correctamente.', 'delete');
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
        this.showToastMessage('Error al eliminar usuario.', 'warning');
      }
    );
  }

  ordenarUsuarios() {
    const activos = this.usuarios.filter(u => u.activo).sort ((a, b) => a.id_usuario - b.id_usuario);
    const inactivos = this.usuarios.filter(u => !u.activo).sort ((a, b) => a.id_usuario - b.id_usuario);
    this.usuarios = [...activos, ...inactivos];
  }

  getNombreRol(id_rol: number): string {
    const rol = this.roles.find(r => r.id_rol === id_rol);
    return rol ? rol.nombre_rol : '';
  }

  getNombreSucursal(id_sucursal: number): string {
    const sucursal = this.sucursales.find(s => s.id_sucursal === id_sucursal);
    return sucursal ? sucursal.nombre_sucursal : '';
  }

  showToastMessage(message: string, type: ToastType) {
    this.toastMessage = message;
    this.toastType = type;
    this.isSuccess = type === 'success';
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 5000);
  }

  cancelarEdicion() {
    this.editingUsuarioId = null;
    this.newUsuario = {
      id_usuario: 0,
      nombre: '',
      correo: '',
      telefono: '',
      contrasena: '',
      id_rol: 0,
      id_sucursal: 0,
      activo: true
    };
  }
}
