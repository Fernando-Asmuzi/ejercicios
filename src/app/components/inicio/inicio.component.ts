import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlumnosService } from 'src/app/services/alumnos.service';
import { EjerciciosService } from 'src/app/services/ejercicios.service';
import { Alumno } from '../../models/alumno';



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  alumnos: Array<Alumno> = [];

  default: number = 0;
  id: number = 0;
  
  formulario = new FormGroup ({
    id: new FormControl(0)
  })
  
  constructor(private alumnosService: AlumnosService, private ejerciciosService: EjerciciosService) { 
  }

  ngOnInit(): void {
    this.cargarAlumnos(); 
  }

  ingresar() {
      console.log(this.id)
  }

  cargarAlumnos(){
      this.alumnosService.getAlumnos().subscribe( resp => {
          this.alumnos = resp.rows;
      });
  }

}
