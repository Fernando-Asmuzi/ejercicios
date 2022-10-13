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
  opciones: number[] = [];
  p: number = 1;


  ngOnInit(): void {
      this.generarEjercicios();

      for(let i of this.ejercicios){
        this.generarOpciones(i.resultado, i.id_ejercicio)
      }
  }

  generarAleatorio(){
      return Math.floor(Math.random() * 10);
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
      {id_ejercicio:0, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: this.generarResultado(this.ejercicios[0].primer_termino, this.ejercicios[0].segundo_termino, this.ejercicios[0].tipo), tipo: "suma"},
      {id_ejercicio:1, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: this.generarResultado(this.ejercicios[1].primer_termino, this.ejercicios[1].segundo_termino, this.ejercicios[1].tipo), tipo: "suma"},
      {id_ejercicio:2, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: this.generarResultado(this.ejercicios[2].primer_termino, this.ejercicios[2].segundo_termino, this.ejercicios[2].tipo), tipo: "suma"},
      {id_ejercicio:3, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: this.generarResultado(this.ejercicios[3].primer_termino, this.ejercicios[3].segundo_termino, this.ejercicios[3].tipo), tipo: "suma"},
      {id_ejercicio:4, primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: this.generarResultado(this.ejercicios[4].primer_termino, this.ejercicios[4].segundo_termino, this.ejercicios[4].tipo), tipo: "suma"}, 
    ]
  }

  generarOpciones(resultado: number, indice: number){
      let opc: number[] = [0,0,0];
      /* opc.push(1).[2] */
      console.log(opc);

     this.opciones = [

     ]    
  }
}
