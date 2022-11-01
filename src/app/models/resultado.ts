export interface Resultado{
    alu_id: number;
    tiempo_total: number;
    porcentaje_total: number;
    fecha: string | null;
}

export const emptyResultado = (): Resultado => ({
    alu_id: 0,
    tiempo_total: 0, 
    porcentaje_total: 0,
    fecha: ''
})