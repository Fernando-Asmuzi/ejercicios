import { Component, OnInit } from '@angular/core';
import { interval, take } from 'rxjs';
import { Sumaresta } from '../../models/suma-resta';
import { AlumnoEjercicio, emptyAlumnoEjercicio } from '../../models/alumno_ejercicio';
import { ActivatedRoute } from "@angular/router";
import { EjerciciosService } from 'src/app/services/ejercicios.service';


@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

  alumno_id: number = 0;
  ejercicios: Sumaresta[] = [];
  opciones = [
    {op_1: 0, op_2: 0, op_3: 0},
    {op_1: 0, op_2: 0, op_3: 0},
    {op_1: 0, op_2: 0, op_3: 0},
    {op_1: 0, op_2: 0, op_3: 0},
    {op_1: 0, op_2: 0, op_3: 0}
  ];
  respuestas: any = [];
  p: number = 1;
  resultado: number = 0;
  mensaje: boolean = false;
  confirmar: boolean = false;
  alu_eje: AlumnoEjercicio = emptyAlumnoEjercicio();
  ejercicio_id: number = 1;
  correctas: any = [];
  continuar: boolean = false;
  tiempo: number = 0;
  minuto: number = 0;
  segundo: number = 0;
  paciente_ejercicio: Array<AlumnoEjercicio> = [];
  intento: number = 0;


  constructor(private route: ActivatedRoute, private ejercicioService: EjerciciosService) { }

  ngOnInit(): void {

      const obs$ = interval(1000);
      obs$.subscribe((d) => {
        this.tiempo = d
      });

      setInterval( () => {
          this.segundo += 1;
          if(this.segundo == 60) {
             this.segundo = 0;
             this.minuto += 1
          }
      }, 1000);

      this.alumno_id = Number(this.route.snapshot.paramMap.get("id"));
      this.generarEjercicios();  

      this.ejercicioService.getEjercicioPaciente(this.alumno_id).subscribe( resp => {
        console.log(resp)
        this.paciente_ejercicio = resp.rows
             for(let i of this.paciente_ejercicio){
                  if(i.ejercicio_id == this.ejercicio_id && i.intento > this.intento){
                        this.intento = i.intento
                  }  
             }
      });

  }

  generarAleatorio(){
      return Math.floor(Math.random() * (10 - 2) + 2);
  }

  controlarTerminos(){
      let ter_1: number
      let ter_2: number
      for (let i=0; i<this.ejercicios.length; i++){
          ter_1 = this.ejercicios[i].primer_termino
          ter_2 = this.ejercicios[i].segundo_termino
          for (let j=0; j<this.ejercicios.length; j++){
              if( i!=j && this.ejercicios[j].primer_termino == ter_1 && this.ejercicios[j].segundo_termino == ter_2){
                this.ejercicios[j].primer_termino = this.generarAleatorio()
                this.ejercicios[j].segundo_termino = this.generarAleatorio()
              }
          }
      }
  }

  generarResultado(ejercicio: any){
    let ej: Sumaresta = ejercicio;
    if(ejercicio.primer_termino <= ejercicio.segundo_termino){
        ej.resultado = ejercicio.primer_termino + ejercicio.segundo_termino;
        ej.tipo = true;
    }else{
        ej.resultado = ejercicio.primer_termino - ejercicio.segundo_termino;
    }
    return ej;
  }

  generarEjercicios(){
    this.ejercicios = [
      {id_ejercicio:0, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 0, tipo: false, correcta: false, respuesta: false },
      {id_ejercicio:1, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 0, tipo: false, correcta: false, respuesta: false },
      {id_ejercicio:2, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 0, tipo: false, correcta: false, respuesta: false },
      {id_ejercicio:3, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 0, tipo: false, correcta: false, respuesta: false },
      {id_ejercicio:4, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 0, tipo: false, correcta: false, respuesta: false }, 
    ]

    this.controlarTerminos();
    for(let i of this.ejercicios){
       this.generarResultado(i)
    }
    this.generarOpciones(this.ejercicios);
  }

  generarOpciones(ejercicios: any){
    let cont: number = 0;
    for(let i of this.opciones){
      this.generarPosiciones(ejercicios[cont].resultado, i);
      cont++;
   }    
  }

  generarPosiciones(resul: number, opc: any){
    let pos: number = 0;

    pos = Math.floor(Math.random() * 3);
    if(pos == 0){
       opc.op_1 = resul;
       opc.op_2 = this.controlarOpcion(resul);
       opc.op_3 = this.controlarOpcionDos(resul, opc.op_2);
    }else{ 
      if(pos == 1){
       opc.op_1 = this.controlarOpcion(resul);
       opc.op_2 = resul;
       opc.op_3 = this.controlarOpcionDos(resul, opc.op_1);
    }else{
      opc.op_1 = this.controlarOpcion(resul);
      opc.op_2 = this.controlarOpcionDos(resul, opc.op_1);
      opc.op_3 = resul;
    }}
  }

  controlarOpcion(resul: number){
      let opcion: number = 0;
      let control: boolean = false;
  
      while(control == false){
        opcion = Math.floor(Math.random() * ((resul+3) - (resul-3)) + (resul-3));
        if(opcion != resul && opcion>=1){
          control = true;
        }
      }
      control = false;
      return opcion;
  }

  controlarOpcionDos(resul: number, opc: number){
    let opcion: number = 0;
    let control: boolean = false;
    
    while(control == false){
      opcion = Math.floor(Math.random() * ((resul+3) - (resul-3)) + (resul-3));
      if(opcion != resul && opcion>=1 && opcion != opc){
        control = true;
      }
    }
    control = false;
    return opcion;
  }
  
  confirmarEleccion(pagina: number){
      let cont = 0;
      if(this.ejercicios[pagina-1].resultado == this.resultado){
          this.ejercicios[pagina-1].correcta = true;
      }
      this.respuestas[pagina-1] = this.resultado;
      this.ejercicios[pagina-1].respuesta = true;

      this.correctas[pagina-1] = this.ejercicios[pagina-1].correcta
      
      for(let i of this.correctas){
         if(i != null){
            cont++
         } 
      }
      if(cont == 5){
          this.continuar = true;
      }
  }

  guardarEleccion(eleccion: number){
      this.resultado = eleccion;
      this.mensaje = true;
      this.confirmar = true;
  }

  reiniciarResultado(){
    this.resultado = 0;
    this.mensaje = false;
    this.confirmar = false;
  }

  cargarResultados(){
        this.alu_eje.paciente_id = this.alumno_id;
        this.alu_eje.ejercicio_id = this.ejercicio_id
        this.alu_eje.operacion_1 = this.correctas[0]
        this.alu_eje.operacion_2 = this.correctas[1]
        this.alu_eje.operacion_3 = this.correctas[2]
        this.alu_eje.operacion_4 = this.correctas[3]
        this.alu_eje.operacion_5 = this.correctas[4]
        this.alu_eje.porcentaje = this.sacarPorcentaje()
        this.alu_eje.tiempo = this.tiempo
        this.alu_eje.realizado = true
        this.alu_eje.intento = (this.intento += 1)

        this.ejercicioService.postAlumnoEjercicio(this.alu_eje).subscribe( resp => {});
        
  }

  sacarPorcentaje(){
    let porcentaje = 0  
    for(let i of this.correctas){
        if(i){
          porcentaje += 20
        }
    }
      return porcentaje;
  }

}



