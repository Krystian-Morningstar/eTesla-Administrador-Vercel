import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AccesosComponent } from './components/accesos/accesos.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { EstructurasComponent } from './components/estructuras/estructuras.component';
import { InversoresComponent } from './components/inversores/inversores.component';
import { PanelesComponent } from './components/paneles/paneles.component';
import { ReportesComponent } from './components/reportes/reportes.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'paneles', component: PanelesComponent },
  { path: 'inversores', component: InversoresComponent },
  { path: 'estructuras', component: EstructurasComponent },
  { path: 'accesos', component: AccesosComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'cuenta', component: CuentaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
