export interface AlumnoEjercicio{
    paciente_id: number;
    ejercicio_id: number;
    operacion_1: any;
    operacion_2: any;
    operacion_3: any;
    operacion_4: any;
    operacion_5: any;   
    porcentaje: number;
    tiempo: number;
    realizado: boolean;
    intento: number;
}

export const emptyAlumnoEjercicio = (): AlumnoEjercicio => ({
    paciente_id: 0,
    ejercicio_id: 0,
    operacion_1: false,
    operacion_2: false,
    operacion_3: false,
    operacion_4: false,
    operacion_5: false,   
    porcentaje: 0,
    tiempo: 0,
    realizado: false,
    intento: 0
})