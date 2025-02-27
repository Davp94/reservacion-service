import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity({ schema: 'administracion', name: 'rol'})
export class Rol{

    @PrimaryColumn({type: 'int2'})
    id: number;

    @Column({type: 'varchar', nullable: false})
    nombre: string;

    @Column({type: 'varchar', nullable: true})
    descripcion: string;

    @Column({type: 'int2', default: 1})
    estado: number;

    // @OneToMany(()=>Usuario, usuario => usuario.rol)
    // usuarios: Usuario[];
}