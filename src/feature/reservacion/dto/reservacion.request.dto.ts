import { Reservacion } from "src/entity/reservacion.entity";

export class ReservacionRequestDto{

    usuarioId: number;
    horarioId: number;
    comentario: string;

    public static buildToEntity(reservacionRequestDto: ReservacionRequestDto) {
        const reservacion: Reservacion = new Reservacion();
        reservacion.comentario = reservacionRequestDto.comentario;
        return reservacion;
    }
}