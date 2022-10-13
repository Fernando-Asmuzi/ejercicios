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
  resultados: number[] = [];
  p: number = 1;

  ngOnInit(): void {
      this.generarEjercicios();
  }

  generarAleatorio(){
      return Math.floor(Math.random() * 10);
  }

  generarResultado(primero: number, segundo: number){
    let resultado: number = 0;  
    return resultado;
  }

  generarEjercicios(){
    this.ejercicios = [
      {primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 3, tipo: "suma"},
      {primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 3, tipo: "suma"},
      {primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 3, tipo: "suma"},
      {primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 3, tipo: "suma"},
      {primer_termino: this.generarAleatorio(), segundo_termino: this.generarAleatorio(), resultado: 3, tipo: "suma"}, 
    ]
  }

}
