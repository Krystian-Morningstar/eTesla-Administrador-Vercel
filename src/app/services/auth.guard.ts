import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const token = localStorage.getItem('token');
        if (token && this.isTokenValid(token)) {
            return true;
        }
        // Token no válido o ausente -> eliminar y redirigir
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
        return false;
    }

    private isTokenValid(token: string): boolean {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return false;
            const payload = JSON.parse(atob(parts[1]));
            if (!payload) return false;
            // Comprueba expiración si existe
            if (payload.exp && (payload.exp * 1000) < Date.now()) {
                return false;
            }
            return true;
        } catch (e) {
            return false;
        }
    }
}
