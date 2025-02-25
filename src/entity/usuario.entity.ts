import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Rol } from "./rol.entity";

@Entity({ schema: 'administracion', name: 'usuario'})
export class Usuario{

    @PrimaryColumn({type: 'int2'})
    id: number;

    @Column({type: 'varchar', nullable: true})
    nombres: string;

    @Column({type: 'varchar', nullable: true})
    apellidos: string;

    @Column({type: 'varchar', nullable: true, unique: true})
    username: string;

    @Column({type: 'varchar', nullable: true, unique: true})
    password: string;

    @Column({type: 'varchar', nullable: true})
    correo: string;

    @Column({type: 'smallint', nullable: true})
    estado: number;

    @ManyToOne(()=>Rol)
    rol: Rol;
}