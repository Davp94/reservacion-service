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

    @Column({type: 'varchar', nullable: true})
    username: string;

    @Column({type: 'varchar', nullable: true})
    password: string;

    @Column({type: 'varchar', nullable: true})
    correo: string;

    @Column({type: 'smallint', nullable: true})
    estado: number;

    @Column({type: 'varchar', nullable: true})
    avatar: string;

    @ManyToOne(()=>Rol)
    rol: Rol;
}