import { Component, OnInit } from '@angular/core';

import { Sumaresta } from '../../models/suma-resta'
import { ConteoImagen } from '../../models/conteoImagen'
import { AlumnoEjercicio, emptyAlumnoEjercicio } from 'src/app/models/alumno_ejercicio';
import { interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { emptyResultado, Resultado } from 'src/app/models/resultado';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-conteo',
  templateUrl: './conteo.component.html',
  styleUrls: ['./conteo.component.css']
})
export class ConteoComponent implements OnInit {

  alumno_id: number = 0;
  ejercicios: ConteoImagen[] = [];
  resultados: number[] = [];
  ejercicio_id: number = 3;
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
  continuar: boolean = false;
  correctas: any = [];
  alu_eje: AlumnoEjercicio = emptyAlumnoEjercicio();
  paciente_ejercicio: Array<AlumnoEjercicio> = [];
  tiempo: number = 0;

  porcentaje_total: number = 0;
  tiempo_total: number = 0;
  agregar_resultado: Resultado = emptyResultado();

  pipe = new DatePipe('en-US');
  minuto: number = 0;
  segundo: number = 0;
  paciente_ejercicio_lista: Array<AlumnoEjercicio> = [];
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

    this.ejercicioService.getEjercicioPaciente(this.alumno_id).subscribe( resp => {
      this.paciente_ejercicio_lista = resp.rows
           for(let i of this.paciente_ejercicio_lista){
                if(i.ejercicio_id == this.ejercicio_id && i.intento > this.intento){
                      this.intento = i.intento
                }  
           }
    });

    this.generarEjercicios();    
    
  }

  generarAleatorio(id: number){
      let resultado = Math.floor(Math.random() * (14 - 3) + 3)
      this.resultados[id] = resultado;
      return "../../../assets/image/reconocimiento/" + resultado + ".png";
  }

  generarAleatorioSolo(){
      return Math.floor(Math.random() * (14 - 3) + 3)
  }

  generarResultado(ejercicio: ConteoImagen){
      ejercicio.resultado = this.resultados[ejercicio.id_ejercicio]
  }

  controlarImagen(){
      let termino: string
      for (let i=0; i<this.ejercicios.length; i++){
        termino = this.ejercicios[i].imagen
      
       /* for (let j=0; j<this.ejercicios.length; j++){
           if( i!=j && this.ejercicios[j].imagen == termino){
             let cambio = false;
             this.ejercicios[j].imagen = this.generarAleatorio(this.ejercicios[j].id_ejercicio)
             while(cambio==false){
               if(this.ejercicios[j].imagen != termino){
                 cambio = true;
               }
             }
           }
       } */
   }
  } 

  generarEjercicios(){
    this.ejercicios = [
      {id_ejercicio:0, imagen: this.generarAleatorio(0), resultado: 0, correcta: false, respuesta: false },
      {id_ejercicio:1, imagen: this.generarAleatorio(1), resultado: 0, correcta: false, respuesta: false },
      {id_ejercicio:2, imagen: this.generarAleatorio(2), resultado: 0, correcta: false, respuesta: false },
      {id_ejercicio:3, imagen: this.generarAleatorio(3), resultado: 0, correcta: false, respuesta: false },
      {id_ejercicio:4, imagen: this.generarAleatorio(4), resultado: 0, correcta: false, respuesta: false }, 
    ]

    this.controlarImagen() 

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
        opcion = this.generarAleatorioSolo()
        if(opcion != resul){
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
      opcion = this.generarAleatorioSolo();
      if(opcion != resul && opcion != opc){
        control = true;
      }
    }
    control = false;
    return opcion;
  }
  
  confirmarEleccion(pagina: number){
    let cont: number = 0;
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
    this.alu_eje.intento = (this.intento+=1)

    this.ejercicioService.postAlumnoEjercicio(this.alu_eje).subscribe( resp => {});

    this.obtenerTotales()
  
}

obtenerTotales(){

  this.agregar_resultado.pac_id = this.alumno_id
  this.agregar_resultado.fecha = this.pipe.transform(Date.now(), 'yyyy/MM/dd');
  this.agregar_resultado.intento = this.alu_eje.intento

  this.ejercicioService.getEjercicioPaciente(this.alumno_id).subscribe( resp => {
    this.paciente_ejercicio = resp.rows

    for(let i of this.paciente_ejercicio){
      if(i.intento == this.agregar_resultado.intento){
        this.agregar_resultado.tiempo_total += i.tiempo
        this.agregar_resultado.porcentaje_total += i.porcentaje
      }
    }

    this.ejercicioService.postResultado(this.agregar_resultado).subscribe(resp => {}); 
    console.log(this.agregar_resultado);

});

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
