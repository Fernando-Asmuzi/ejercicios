import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlumnoEjercicio } from '../models/alumno_ejercicio';
import { Resultado, emptyResultado } from '../models/resultado';
import { Ejercicio, emptyEjercicio } from '../models/ejercicio';

const cudOptions = {
  headers: new HttpHeaders ({'Content-Type': 'application/json'}),
}

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  private urlBase = environment.url_servicios_base;
  private apiAlumnos = this.urlBase + '/api';

  constructor(public http: HttpClient) { }

  postAlumnoEjercicio(alu_eje: any): Observable<AlumnoEjercicio> {
      return this.http.post<AlumnoEjercicio>(this.apiAlumnos, alu_eje)
  }

  postResultado(resultado: any): Observable<Resultado> {
    return this.http.post<Resultado>(this.apiAlumnos+"/resultado/", resultado)
  }

  getEjercicioPaciente(paciente_id: any): Observable<any>{
     return this.http.get<AlumnoEjercicio[]>(this.apiAlumnos+"/resultado/ejercicio/"+paciente_id, cudOptions)
  }

  getEjercicios(): Observable<any>{
    return this.http.get<Ejercicio[]>(this.apiAlumnos+"/ejercicio", cudOptions)
  }

  getResultadoId(paciente_id: any): Observable<any>{
    return this.http.get<Resultado[]>(this.apiAlumnos+"/total/"+paciente_id, cudOptions)
  }

}
