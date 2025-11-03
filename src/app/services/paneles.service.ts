import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PanelesService {
    private apiUrl = 'http://localhost:3000/api/paneles';

    constructor(private http: HttpClient) { }

    getPaneles(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    crearPanel(panel: any): Observable<any> {
        const url = 'http://localhost:3000/api/paneles/nuevo';
        return this.http.post<any>(url, panel);
    }

    getOrigenes(): Observable<any[]> {
        const url = 'http://localhost:3000/api/paneles/origen';
        return this.http.get<any[]>(url);
    }

    getMarcas(): Observable<any[]> {
        const url = 'http://localhost:3000/api/paneles/marca';
        return this.http.get<any[]>(url);
    }

    softDeletePanel(id: number): Observable<any> {
        const url = `http://localhost:3000/api/paneles/${id}`;
        return this.http.delete<any>(url);
    }

    reactivarPanel(id: number): Observable<any> {
        const url = `http://localhost:3000/api/paneles/${id}/reactivar`;
        return this.http.patch<any>(url, {});
    }

    actualizarPanel(id: number, panel: any): Observable<any> {
        const url = `http://localhost:3000/api/paneles/${id}`;
        return this.http.put<any>(url, panel);
    }
}
