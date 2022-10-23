import { Component, OnInit } from '@angular/core';

import { Sumaresta } from '../../models/suma-resta'

@Component({
  selector: 'app-operaciones',
  templateUrl: './operaciones.component.html',
  styleUrls: ['./operaciones.component.css']
})
export class OperacionesComponent implements OnInit {

  constructor() { }

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


  ngOnInit(): void {
      this.generarEjercicios();      
  }

  generarAleatorio(){
      return Math.floor(Math.random() * (10 - 2) + 2);
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
      if(this.ejercicios[pagina-1].resultado == this.resultado){
          this.ejercicios[pagina-1].correcta = true;
      }
      this.respuestas[pagina-1] = this.resultado;
      this.ejercicios[pagina-1].respuesta = true;
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

}

