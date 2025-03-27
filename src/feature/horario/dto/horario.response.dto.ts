import { Horario } from "src/entity/horario.entity";

export class HorarioResponseDto{

    id: number;
    fecha: Date;
    hora_inicio: string;
    hora_fin: string;
    estado: number;
    empresaNombre: string;
    empresaId: number;

    public static buildFromEntity(horario: Horario) {
        const horarioResponseDto: HorarioResponseDto = new HorarioResponseDto();
        horarioResponseDto.id = horario.id;
        horarioResponseDto.fecha = horario.fecha;
        horarioResponseDto.hora_inicio = horario.hora_inicio;
        horarioResponseDto.hora_fin = horario.hora_fin;
        horarioResponseDto.estado = horario.estado;
        horarioResponseDto.empresaNombre = horario.empresa.nombre;
        horarioResponseDto.empresaId = horario.empresa.id;
        return horarioResponseDto;
    }
}