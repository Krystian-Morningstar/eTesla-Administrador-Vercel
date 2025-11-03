// cuenta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class CuentaService {
  private apiUrl = 'http://localhost:3000/api/usuario';
  // private userProfile = {
  //   nombre: 'Rodrigo Castro',
  //   rol: 'Administrador',
  //   telefono: '56 3608 4069',
  //   correo: 'rodrigo@gmail.com',
  //   direccion: 'Av. Principal #123, Orizaba, Veracruz, México'
  // };

  constructor(private http: HttpClient) {}

  // getUserProfile() {
  //   return this.userProfile;
  // }

  // cambiarContrasena() {
  //   console.log('Función de cambio de contraseña en desarrollo.');
  // }

  // editarPerfil() {
  //   console.log('Función de edición de perfil en desarrollo.');
  // }

  getUsuarioActual(): Observable<Usuario> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Usuario>(this.apiUrl, { headers });
  }
}
