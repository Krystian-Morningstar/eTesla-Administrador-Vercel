// accesos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccesosService {
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRoles(): Observable<any[]> {
    const url = 'http://localhost:3000/api/usuarios/roles';
    return this.http.get<any[]>(url);
  }

  getSucursales(): Observable<any[]> {
    const url = 'http://localhost:3000/api/usuarios/sucursales';
    return this.http.get<any[]>(url);
  }

  crearUsuario(usuario: any): Observable<any> {
    const url = 'http://localhost:3000/api/usuarios/nuevo';
    return this.http.post<any>(url, usuario);
  }

  SoftDeleteUsuario(id: number): Observable<any> {
    const url = `http://localhost:3000/api/usuarios/${id}`;
    return this.http.delete<any>(url);
  }

  reactivarUsuario(id: number): Observable<any> {
    const url = `http://localhost:3000/api/usuarios/${id}/reactivar`;
    return this.http.patch<any>(url, {});
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    const url = `http://localhost:3000/api/usuarios/${id}`;
    return this.http.put<any>(url, usuario);
  }
}
