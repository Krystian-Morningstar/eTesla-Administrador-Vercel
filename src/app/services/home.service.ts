import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private dolarApiUrl = 'https://api.exchangerate-api.com/v4/latest/USD'; // API pública para tasas de cambio

  constructor(private http: HttpClient) {}

  getPrecioDolar(): Observable<string> {
    return this.http.get<any>(this.dolarApiUrl).pipe(
      map(data => {
        if (data && data.rates && data.rates.MXN) {
          return data.rates.MXN.toFixed(2);
        }
        return 'No disponible';
      }),
      catchError(() => of('No disponible'))
    );
  }
}
