import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Conteo } from '../../models/conteo'
import { AlumnoEjercicio, emptyAlumnoEjercicio } from '../../models/alumno_ejercicio';
import { ActivatedRoute } from "@angular/router";
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { interval, take } from 'rxjs';

@Component({
  selector: 'app-reconocimiento',
  templateUrl: './reconocimiento.component.html',
  styleUrls: ['./reconocimiento.component.css']
})
export class ReconocimientoComponent implements OnInit {

  alumno_id: number = 0;
  ejercicios: Conteo[] = [];
  opciones = [
    {op_1: '', op_2: '', op_3: ''},
    {op_1: '', op_2: '', op_3: ''},
    {op_1: '', op_2: '', op_3: ''},
    {op_1: '', op_2: '', op_3: ''},
    {op_1: '', op_2: '', op_3: ''}
  ];
  respuestas: any = [];
  p: number = 1;
  resultado: string | undefined = '';
  mensaje: boolean = false;
  confirmar: boolean = false;
  correctas: any = [];
  continuar: boolean = false;
  alu_eje: AlumnoEjercicio = emptyAlumnoEjercicio();
  ejercicio_id: number = 2;
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

      this.ejercicioService.getEjercicioPaciente(this.alumno_id).subscribe( resp => {
        this.paciente_ejercicio = resp.rows
             for(let i of this.paciente_ejercicio){
                  if(i.ejercicio_id == this.ejercicio_id && i.intento > this.intento){
                        this.intento = i.intento
                  }  
             }
      });
     
      this.generarEjercicios(); 
      
  }

  generarAleatorio(){
      return Math.floor(Math.random() * (19 - 10) + 10);
  }

  generarLiteral(conteo: number){
      switch(conteo){
        case 10: return 'DIEZ';
        case 11: return 'ONCE';
        case 12: return 'DOCE';
        case 13: return 'TRECE';
        case 14: return 'CATORCE';
        case 15: return 'QUINCE';
        case 16: return 'DIECISEIS';
        case 17: return 'DIECISIETE';
        case 18: return 'DIECIOCHO';
        case 19: return 'DIECINUEVE';
      }
      return '';
  }

  controlarTerminos(){
     let termino: number
     for (let i=0; i<this.ejercicios.length; i++){
      termino = this.ejercicios[i].numero
      for (let j=0; j<this.ejercicios.length; j++){
          if( i!=j && this.ejercicios[j].numero == termino){
            let cambio = false;
            this.ejercicios[j].numero = this.generarAleatorio()
            while(cambio==false){
              if(this.ejercicios[j].numero != termino){
                cambio = true;
              }
            }
          }
      }
  }
  }

  generarEjercicios(){
    this.ejercicios = [
      {id_ejercicio:0, numero: this.generarAleatorio(), numero_literal: '', correcta: false, respuesta: false },
      {id_ejercicio:1, numero: this.generarAleatorio(), numero_literal: '', correcta: false, respuesta: false },
      {id_ejercicio:2, numero: this.generarAleatorio(), numero_literal: '', correcta: false, respuesta: false },
      {id_ejercicio:3, numero: this.generarAleatorio(), numero_literal: '', correcta: false, respuesta: false },
      {id_ejercicio:4, numero: this.generarAleatorio(), numero_literal: '', correcta: false, respuesta: false },
    ]

    this.controlarTerminos();
 
    for(let i of this.ejercicios){
         i.numero_literal = this.generarLiteral(i.numero)
    }

     this.generarOpciones(this.ejercicios); 
  }

  generarOpciones(ejercicios: any){
    let cont: number = 0;
    for(let i of this.opciones){
      this.generarPosiciones(ejercicios[cont].numero_literal, i);
      cont++;
   }    
  }

  generarPosiciones(resul: string, opc: any){
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

  controlarOpcion(resul: string){
      let opcion: string | undefined = '';
      let control: boolean = false;
  
      while(control == false){
        opcion = this.generarLiteral(this.generarAleatorio())   
        if(opcion != resul){
          control = true;
        }
      }
      control = false;
      return opcion;
  }

  controlarOpcionDos(resul: string, opc: string){
    let opcion: string | undefined = '';
    let control: boolean = false;
    
    while(control == false){
      opcion = this.generarLiteral(this.generarAleatorio());
      if(opcion != resul && opcion != opc){
        control = true;
      }
    }
    control = false;
    return opcion;
  }
  
  confirmarEleccion(pagina: number){
      let cont = 0
      if(this.ejercicios[pagina-1].numero_literal == this.resultado){
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

  guardarEleccion(eleccion: string){
      this.resultado = eleccion;
      this.mensaje = true;
      this.confirmar = true;
  }

  reiniciarResultado(){
    this.resultado = '';
    this.mensaje = false;
    this.confirmar = false;
  }

  cargarResultados(){

    this.alu_eje.paciente_id = this.alumno_id
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
