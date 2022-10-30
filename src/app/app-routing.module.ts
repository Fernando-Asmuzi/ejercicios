import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConteoComponent } from './components/conteo/conteo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { OperacionesComponent } from './components/operaciones/operaciones.component';
import { ReconocimientoComponent } from './components/reconocimiento/reconocimiento.component';


const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'conteo/:id', component: ConteoComponent},
  {path: 'operaciones/:id', component: OperacionesComponent},
  {path: 'reconocimiento/:id', component: ReconocimientoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
