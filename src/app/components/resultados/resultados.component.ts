import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AlumnosService } from 'src/app/services/alumnos.service';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { AlumnoEjercicio } from 'src/app/models/alumno_ejercicio';
import { Alumno, emptyAlumno } from 'src/app/models/alumno';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  paciente_id: Number = 0;
  paciente_ejercicio: Array<AlumnoEjercicio> = [];
  conversor: string = '';
  alumno: Alumno[] = [];
  tiempo_total: number = 0;
  porcentaje_promedio: number = 0;


  constructor(private route: ActivatedRoute, private ejercicioService: EjerciciosService, private alumnoService: AlumnosService) { }

  ngOnInit(): void {
    this.paciente_id = Number(this.route.snapshot.paramMap.get("id"));

    this.alumnoService.getAlumnoId(this.paciente_id).subscribe(resp => {
          this.alumno = resp.rows
    })

    this.ejercicioService.getEjercicioPaciente(this.paciente_id).subscribe( resp => {
           this.paciente_ejercicio = resp.rows
           
           for(let i of this.paciente_ejercicio){
             i.operacion_1 = this.convertirBoolean(i.operacion_1)
             i.operacion_2 = this.convertirBoolean(i.operacion_2)
             i.operacion_3 = this.convertirBoolean(i.operacion_3)
             i.operacion_4 = this.convertirBoolean(i.operacion_4)
             i.operacion_5 = this.convertirBoolean(i.operacion_5)
             this.tiempo_total += i.tiempo;
             this.porcentaje_promedio += i.porcentaje
           }

           console.log(this.tiempo_total);
    });
  
  }

  convertirBoolean(bol: any){
    let resp: string
       if(bol){
          resp = "Correcta"
       }else{
          resp = "Incorrecta"
       }
       return resp 
  }
}
