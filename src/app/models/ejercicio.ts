export interface Ejercicio{
    id_ejercicio: number;
    descripcion: string;
}

export const emptyEjercicio = (): Ejercicio => ({
    id_ejercicio: 0,
    descripcion: '',
})


