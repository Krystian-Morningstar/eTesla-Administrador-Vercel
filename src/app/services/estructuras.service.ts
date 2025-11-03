import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstructurasService {
  private apiUrl = 'https://etesla-api-vercel.onrender.com/api/estructuras';

  constructor(private http: HttpClient) { }

  getEstructuras(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  crearEstructura(estructura: any): Observable<any> {
    const url = 'https://etesla-api-vercel.onrender.com/api/estructuras/nuevo';
    return this.http.post<any>(url, estructura);
  }

  getOrigenes(): Observable<any[]> {
    const url = 'https://etesla-api-vercel.onrender.com/api/estructuras/origen';
    return this.http.get<any[]>(url);
  }

  getMarcas(): Observable<any[]> {
    const url = 'https://etesla-api-vercel.onrender.com/api/estructuras/marca';
    return this.http.get<any[]>(url);
  }

  softDeleteEstructura(id: number): Observable<any> {
    const url = `https://etesla-api-vercel.onrender.com/api/estructuras/${id}`;
    return this.http.delete<any>(url);
  }
  
  reactivarEstructura(id: number): Observable<any> {
    const url = `https://etesla-api-vercel.onrender.com/api/estructuras/${id}/reactivar`;
    return this.http.patch<any>(url, {});
  }

  actualizarEstructura(id: number, estructura: any): Observable<any> {
    const url = `https://etesla-api-vercel.onrender.com/api/estructuras/${id}`;
    return this.http.put<any>(url, estructura);
  }
}
