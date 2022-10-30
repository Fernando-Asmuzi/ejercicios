export class Alumno{
    id_alumno: number;
    nombre: string;
    apellido: string;

    constructor(id: number, nom: string, ape: string){
            this.id_alumno = id;
            this.nombre = nom;
            this.apellido = ape;
    }
}

