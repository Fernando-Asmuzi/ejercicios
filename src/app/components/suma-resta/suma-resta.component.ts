import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suma-resta',
  templateUrl: './suma-resta.component.html',
  styleUrls: ['./suma-resta.component.css']
})
export class SumaRestaComponent implements OnInit {

  ej01 = [5 , 7 , 12];
  ej02 = [16, 9 , 7];

  constructor() { }

  ngOnInit(): void {
  }

  generarRespuesta(){
    
  }

}
