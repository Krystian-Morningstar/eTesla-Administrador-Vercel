import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InversoresService {
    private apiUrl = 'https://etesla-api-vercel.onrender.com/api/inversores';

    constructor(private http: HttpClient) { }

    getInversores(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    crearInversor(inversor: any): Observable<any> {
        const url = 'https://etesla-api-vercel.onrender.com/api/inversores/nuevo';
        return this.http.post<any>(url, inversor);
    }

    getOrigenes(): Observable<any[]> {
        const url = 'https://etesla-api-vercel.onrender.com/api/inversores/origen';
        return this.http.get<any[]>(url);
    }

    getMarcas(): Observable<any[]> {
        const url = 'https://etesla-api-vercel.onrender.com/api/inversores/marca';
        return this.http.get<any[]>(url);
    }

    softDeleteInversor(id: number): Observable<any> {
        const url = `https://etesla-api-vercel.onrender.com/api/inversores/${id}`;
        return this.http.delete<any>(url);
    }

    reactivarInversor(id: number): Observable<any> {
        const url = `https://etesla-api-vercel.onrender.com/api/inversores/${id}/reactivar`;
        return this.http.patch<any>(url, {});
    }

    actualizarInversor(id: number, inversor: any): Observable<any> {
        const url = `https://etesla-api-vercel.onrender.com/api/inversores/${id}`;
        return this.http.put<any>(url, inversor);
    }
}
