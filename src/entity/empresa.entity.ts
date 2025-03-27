import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Rol } from "./rol.entity";
import { Usuario } from "./usuario.entity";

@Entity({ schema: 'administracion', name: 'empresa'})
export class Empresa{

    @PrimaryColumn({type: 'int2'})
    id: number;

    @Column({type: 'varchar', nullable: true})
    nombre: string;

    @Column({type: 'varchar', nullable: true})
    codigo_registro: string;

    @Column({type: 'varchar', nullable: true, unique: true})
    razon_social: string;

    @Column({type: 'varchar', nullable: true, unique: true})
    nit: string;

    @Column({type: 'varchar', nullable: true})
    logo: string;

    @Column({type: 'smallint', nullable: true})
    estado: number;

    @ManyToOne(()=>Usuario)
    usuario: Usuario;
}