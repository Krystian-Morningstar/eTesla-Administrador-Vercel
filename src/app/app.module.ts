import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthGuard } from './services/auth.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PanelesComponent } from './components/paneles/paneles.component';
import { InversoresComponent } from './components/inversores/inversores.component';
import { EstructurasComponent } from './components/estructuras/estructuras.component';
import { AccesosComponent } from './components/accesos/accesos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { CuentaComponent } from './components/cuenta/cuenta.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'paneles', component: PanelesComponent, canActivate: [AuthGuard] },
  { path: 'inversores', component: InversoresComponent, canActivate: [AuthGuard] },
  { path: 'estructuras', component: EstructurasComponent, canActivate: [AuthGuard] },
  { path: 'accesos', component: AccesosComponent, canActivate: [AuthGuard] },
  { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard] },
  { path: 'cuenta', component: CuentaComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PanelesComponent,
    InversoresComponent,
    EstructurasComponent,
    AccesosComponent,
    ReportesComponent,
    CuentaComponent,
    NavBarComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
