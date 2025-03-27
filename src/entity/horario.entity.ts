import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { Usuario } from "./usuario.entity";
import { Empresa } from "./empresa.entity";

@Entity({ schema: 'administracion', name: 'horario'})
export class Horario{

    @PrimaryColumn({type: 'int4'})
    id: number;

    @Column({type: 'varchar', nullable: false})
    fecha: Date;

    @Column({type: 'varchar', nullable: false})
    hora_inicio: string;

    @Column({type: 'varchar', nullable: false})
    hora_fin: string;

    @Column({type: 'smallint', nullable: true})
    estado: number;

    @ManyToOne(()=>Empresa)
    empresa: Empresa;
}