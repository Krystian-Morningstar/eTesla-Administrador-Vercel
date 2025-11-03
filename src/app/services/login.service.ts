import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

interface User {
  email: string;
  password: string;
  role: 'admin' | 'ventas';
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // private users: User[] = [
  //   { email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
  //   { email: 'ventas@gmail.com', password: 'ventas123', role: 'ventas' }
  // ];

  private apiUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    const body = {
      correo: credentials.email,
      contrasena: credentials.password
    };
    return this.http.post<any>(this.apiUrl, body);
  }

  logout(): Observable<boolean> {
    // Elimina token en cliente y simula una respuesta del servidor
    localStorage.removeItem('token');
    return of(true).pipe(delay(200));
  }
}