import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SumaRestaComponent } from './components/suma-resta/suma-resta.component';
import { ReconocimientoComponent } from './components/reconocimiento/reconocimiento.component';
import { ConteoComponent } from './components/conteo/conteo.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    SumaRestaComponent,
    ReconocimientoComponent,
    ConteoComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
