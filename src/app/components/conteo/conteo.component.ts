import { Component, OnInit } from '@angular/core';

import { Sumaresta } from '../../models/suma-resta'
import { Conteo } from '../../models/conteo'
@Component({
  selector: 'app-conteo',
  templateUrl: './conteo.component.html',
  styleUrls: ['./conteo.component.css']
})
export class ConteoComponent implements OnInit {

  constructor() { }

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


  ngOnInit(): void {
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

  generarEjercicios(){
    this.ejercicios = [
      {id_ejercicio:0, numero: this.generarAleatorio(), numero_literal: '', correcta: false, respuesta: false },
      {id_ejercicio:1, numero: this.generarAleatorio(), numero_literal: '', correcta: false, respuesta: false },
      {id_ejercicio:2, numero: this.generarAleatorio(), numero_literal: '', correcta: false, respuesta: false },
      {id_ejercicio:3, numero: this.generarAleatorio(), numero_literal: '', correcta: false, respuesta: false },
      {id_ejercicio:4, numero: this.generarAleatorio(), numero_literal: '', correcta: false, respuesta: false },
    ]

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
      if(this.ejercicios[pagina-1].numero_literal == this.resultado){
          this.ejercicios[pagina-1].correcta = true;
      }
      this.respuestas[pagina-1] = this.resultado;
      this.ejercicios[pagina-1].respuesta = true;
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

}
