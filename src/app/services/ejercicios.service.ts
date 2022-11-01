import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoEjercicio } from '../models/alumno_ejercicio';
import { Resultado, emptyResultado } from '../models/resultado';



const cudOptions = {
  headers: new HttpHeaders ({'Content-Type': 'application/json'}),
}

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  private urlBase = environment.url_servicios_base;
  private apiAlumnos = this.urlBase + '/api/inicio';

  constructor(public http: HttpClient) { }

  postAlumnoEjercicio(alu_eje: any): Observable<AlumnoEjercicio> {
      return this.http.post<AlumnoEjercicio>(this.apiAlumnos, alu_eje)
  }

  postResultado(resultado: any): Observable<Resultado> {
    return this.http.post<Resultado>(this.apiAlumnos+"/resultado/", resultado)
  }

  getPorcentajeTotal(alu_id: number): Observable<any> {
     return this.http.get<Number>(this.apiAlumnos+"/porcentaje/"+alu_id)
  }

  getTiempoTotal(alu_id: number): Observable<any> {
    return this.http.get<Number>(this.apiAlumnos+"/tiempo/"+alu_id)
 }
}
