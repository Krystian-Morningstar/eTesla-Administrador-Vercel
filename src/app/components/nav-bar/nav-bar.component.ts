import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  constructor(private loginService: LoginService, private router: Router) { }

  logout(): void {
    // Remover token y llamar al servicio de logout
    this.loginService.logout().subscribe(() => {
      // Forzar eliminación y navegación al login
      localStorage.removeItem('token');
      // Reemplazar historial para prevenir navegación atrás
      this.router.navigate(['/login']).then(() => {
        history.replaceState(null, '', '/login');
      });
    });
  }

}
