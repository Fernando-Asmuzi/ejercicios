import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AlumnosService } from 'src/app/services/alumnos.service';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { AlumnoEjercicio } from 'src/app/models/alumno_ejercicio';
import { Alumno, emptyAlumno } from 'src/app/models/alumno';
import { Ejercicio, emptyEjercicio } from 'src/app/models/ejercicio';
import { Resultado } from 'src/app/models/resultado';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  paciente_id: Number = 0;
  paciente_ejercicio: Array<AlumnoEjercicio> = [];
  ejercicios: Array<Ejercicio> = [];
  resultados: Array<Resultado> = [];
  conversor: string = '';
  alumno: Alumno[] = [];
  porcentaje_promedio: number = 0;
  intento: number[] = [];
  correctas: number[] = [];
  incorrectas: number[] = [];


  constructor(private route: ActivatedRoute, private ejercicioService: EjerciciosService, private alumnoService: AlumnosService) { }

  ngOnInit(): void {
    this.paciente_id = Number(this.route.snapshot.paramMap.get("id"));

    this.alumnoService.getAlumnoId(this.paciente_id).subscribe(resp => {
          this.alumno = resp.rows
    })

     this.ejercicioService.getEjercicios().subscribe( resp => {
        this.ejercicios = resp.rows;
    })

     this.ejercicioService.getResultadoId(this.paciente_id).subscribe(resp => {
       this.resultados = resp.rows;
       console.log(this.resultados)
    })  

    this.ejercicioService.getEjercicioPaciente(this.paciente_id).subscribe( resp => {
           this.paciente_ejercicio = resp.rows
           let cont=0;
           let indice=0;
           for(let i of this.paciente_ejercicio){
             this.correctas[indice] = 0;
             this.incorrectas[indice] = 0;
          
             i.operacion_1 = this.convertirBoolean(i.operacion_1, indice)
             i.operacion_2 = this.convertirBoolean(i.operacion_2, indice)
             i.operacion_3 = this.convertirBoolean(i.operacion_3, indice)
             i.operacion_4 = this.convertirBoolean(i.operacion_4, indice)
             i.operacion_5 = this.convertirBoolean(i.operacion_5, indice)
             if(i.intento > cont){
              this.intento[cont] = i.intento
              cont++
             }
            
             indice++   
           }

    });
  
  }

  convertirBoolean(bol: any, i: number){
    let resp: string
       if(bol){
          resp = "Correcta"
          this.correctas[i] += 1 
       }else{
          resp = "Incorrecta"
          this.incorrectas[i] +=1
       }
       return resp 
  }
}
