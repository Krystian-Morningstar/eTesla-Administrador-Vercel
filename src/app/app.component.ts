import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'eTesla';
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        const token = localStorage.getItem('token');
        // Si la ruta no es login y no hay token, redirigir
        if (!token && event.url !== '/login') {
          // Reemplazar estado para evitar back
          history.replaceState(null, '', '/login');
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
