import { Component, OnInit } from '@angular/core';

import { Sumaresta } from '../../models/suma-resta'
@Component({
  selector: 'app-suma-resta',
  templateUrl: './suma-resta.component.html',
  styleUrls: ['./suma-resta.component.css']
})
export class SumaRestaComponent implements OnInit {

  constructor() { }

  ejercicios: Sumaresta[] = [];
  opciones = [
    {op_1: 1, op_2: 2, op_3: 3},
    {op_1: 4, op_2: 5, op_3: 6},
    {op_1: 7, op_2: 8, op_3: 9},
    {op_1: 1, op_2: 2, op_3: 3},
    {op_1: 4, op_2: 5, op_3: 6}
  ];
  p: number = 1;
  resultado: number = 0;
  mensaje: boolean = false;


  ngOnInit(): void {
      this.generarEjercicios();

      /* this.formatearResultado(); */

     /*  for(let i of this.ejercicios){
        this.generarOpciones(i.resultado, i.id_ejercicio)
      } */
  }

  generarAleatorio(){
      return Math.floor(Math.random() * (10 - 2) + 2);
  }

  generarResultado(primero: number, segundo: number, tipo: string){
    let resultado: number = 0;
    if(tipo == "suma"){
      resultado = primero + segundo;
    }else{
      resultado = primero - segundo;
    }  
    return resultado;
  }

  generarEjercicios(){
    this.ejercicios = [
      {id_ejercicio:0, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 0 /* this.generarResultado(this.ejercicios[0].primer_termino, this.ejercicios[0].segundo_termino, this.ejercicios[0].tipo) */, tipo: "suma"},
      {id_ejercicio:1, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 0 /* this.generarResultado(this.ejercicios[1].primer_termino, this.ejercicios[1].segundo_termino, this.ejercicios[1].tipo) */, tipo: "suma"},
      {id_ejercicio:2, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 0 /* this.generarResultado(this.ejercicios[2].primer_termino, this.ejercicios[2].segundo_termino, this.ejercicios[2].tipo) */, tipo: "suma"},
      {id_ejercicio:3, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 0 /* this.generarResultado(this.ejercicios[3].primer_termino, this.ejercicios[3].segundo_termino, this.ejercicios[3].tipo) */, tipo: "suma"},
      {id_ejercicio:4, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 0 /* this.generarResultado(this.ejercicios[4].primer_termino, this.ejercicios[4].segundo_termino, this.ejercicios[4].tipo) */, tipo: "suma"}, 
    ]
  }

  generarOpciones(resultado: number, indice: number){
    
     this.opciones = [
        
     ]    
  }

  guardarEleccion(eleccion: number){
      this.resultado = eleccion;
      this.mensaje = true;
  }

  reiniciarResultado(){
    this.resultado = 0;
    this.mensaje = false;
  }

  formatearResultado(){
    if(this.resultado == 0){
        this.mensaje = false;
    }
  }
}
