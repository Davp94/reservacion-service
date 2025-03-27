import { Reservacion } from "src/entity/reservacion.entity";
import { HorarioResponseDto } from "src/feature/horario/dto/horario.response.dto";

export class ReservacionResponseDto{

    id: number;
    comentario: string;
    horario: HorarioResponseDto;

    public static buildFromEntity(reservacion: Reservacion) {
        const reservacionResponseDto: ReservacionResponseDto = new ReservacionResponseDto();
        reservacionResponseDto.id = reservacion.id;
        reservacionResponseDto.comentario = reservacion.comentario;
        return reservacionResponseDto;
    }
}