import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { Usuario } from "./usuario.entity";
import { Empresa } from "./empresa.entity";
import { Horario } from "./horario.entity";

@Entity({ schema: 'administracion', name: 'reservacion'})
export class Reservacion{

    @PrimaryColumn({type: 'int4'})
    id: number;

    @Column({type: 'varchar', nullable: false})
    comentario: string;

    @ManyToOne(()=>Empresa)
    usuario: Usuario;

    @ManyToOne(()=>Empresa)
    horario: Horario;
}