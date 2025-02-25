import { Entity, OneToMany } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity({ schema: 'administracion', name: 'rol'})
export class Rol{

    id: number;

    nombre: string;

    descripcion: string;

    estado: number;

    // @OneToMany(()=>Usuario, usuario => usuario.rol)
    // usuarios: Usuario[];
}