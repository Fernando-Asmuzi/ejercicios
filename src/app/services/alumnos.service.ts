import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Alumno } from '../models/alumno';

const cudOptions = {
  headers: new HttpHeaders ({'Content-Type': 'application/json'}),
}

@Injectable({
  providedIn: 'root'
})

export class AlumnosService {

  private urlBase = environment.url_servicios_base;
  private apiAlumnos = this.urlBase + '/api';

  constructor(public http: HttpClient) { }

  getAlumnos(): Observable<any> {
     return this.http.get<Alumno[]>(this.apiAlumnos, cudOptions)
  }

  getAlumnoId(id: any): Observable<any> {
    return this.http.get<Alumno>(this.apiAlumnos+'/paciente/'+id)
  }

}
