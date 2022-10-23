import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReconocimientoComponent } from './components/reconocimiento/reconocimiento.component';
import { ConteoComponent } from './components/conteo/conteo.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OperacionesComponent } from './components/operaciones/operaciones.component';

@NgModule({
  declarations: [
    AppComponent,
    ReconocimientoComponent,
    ConteoComponent,
    InicioComponent,
    DashboardComponent,
    OperacionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
