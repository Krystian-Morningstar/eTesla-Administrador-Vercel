// accesos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccesosService {
  private apiUrl = 'https://etesla-api-vercel.onrender.com/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRoles(): Observable<any[]> {
    const url = 'https://etesla-api-vercel.onrender.com/api/usuarios/roles';
    return this.http.get<any[]>(url);
  }

  getSucursales(): Observable<any[]> {
    const url = 'https://etesla-api-vercel.onrender.com/api/usuarios/sucursales';
    return this.http.get<any[]>(url);
  }

  crearUsuario(usuario: any): Observable<any> {
    const url = 'https://etesla-api-vercel.onrender.com/api/usuarios/nuevo';
    return this.http.post<any>(url, usuario);
  }

  SoftDeleteUsuario(id: number): Observable<any> {
    const url = `https://etesla-api-vercel.onrender.com/api/usuarios/${id}`;
    return this.http.delete<any>(url);
  }

  reactivarUsuario(id: number): Observable<any> {
    const url = `https://etesla-api-vercel.onrender.com/api/usuarios/${id}/reactivar`;
    return this.http.patch<any>(url, {});
  }

  actualizarUsuario(id: number, usuario: any): Observable<any> {
    const url = `https://etesla-api-vercel.onrender.com/api/usuarios/${id}`;
    return this.http.put<any>(url, usuario);
  }
}
