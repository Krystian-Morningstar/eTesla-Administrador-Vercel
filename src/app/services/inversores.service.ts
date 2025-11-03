import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InversoresService {
    private apiUrl = 'http://localhost:3000/api/inversores';

    constructor(private http: HttpClient) { }

    getInversores(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    crearInversor(inversor: any): Observable<any> {
        const url = 'http://localhost:3000/api/inversores/nuevo';
        return this.http.post<any>(url, inversor);
    }

    getOrigenes(): Observable<any[]> {
        const url = 'http://localhost:3000/api/inversores/origen';
        return this.http.get<any[]>(url);
    }

    getMarcas(): Observable<any[]> {
        const url = 'http://localhost:3000/api/inversores/marca';
        return this.http.get<any[]>(url);
    }

    softDeleteInversor(id: number): Observable<any> {
        const url = `http://localhost:3000/api/inversores/${id}`;
        return this.http.delete<any>(url);
    }

    reactivarInversor(id: number): Observable<any> {
        const url = `http://localhost:3000/api/inversores/${id}/reactivar`;
        return this.http.patch<any>(url, {});
    }

    actualizarInversor(id: number, inversor: any): Observable<any> {
        const url = `http://localhost:3000/api/inversores/${id}`;
        return this.http.put<any>(url, inversor);
    }
}
