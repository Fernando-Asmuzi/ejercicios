export interface AlumnoEjercicio{
    alumno_id: number;
    ejercicio_id: number;
    operacion_1: boolean;
    operacion_2: boolean;
    operacion_3: boolean;
    operacion_4: boolean;
    operacion_5: boolean;   
    porcentaje: number;
    tiempo: number;
    realizado: boolean;
}

export const emptyAlumnoEjercicio = (): AlumnoEjercicio => ({
    alumno_id: 0,
    ejercicio_id: 0,
    operacion_1: false,
    operacion_2: false,
    operacion_3: false,
    operacion_4: false,
    operacion_5: false,   
    porcentaje: 0,
    tiempo: 0,
    realizado: false
})