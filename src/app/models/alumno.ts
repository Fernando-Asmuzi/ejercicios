export interface Alumno{
    id_paciente: number;
    nombre: string;
    apellido: string;
    edad: number;
    edad_mental: number;
}

export const emptyAlumno = (): Alumno => ({
    id_paciente: 0,
    nombre: '',
    apellido: '',
    edad: 0,
    edad_mental: 0,
})


