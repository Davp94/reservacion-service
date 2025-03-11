import { Usuario } from "src/entity/usuario.entity";

export class UsuarioRequestDto{

    nombres: string;
    apellidos: string;
    username: string;
    password: string;
    correo: string;
    estado: number;

    public static buildToEntity(usuarioRequestDto: UsuarioRequestDto) {
        const usuario: Usuario = new Usuario();
        usuario.nombres = usuarioRequestDto.nombres;
        usuario.apellidos = usuarioRequestDto.apellidos;
        usuario.correo = usuarioRequestDto.correo;
        usuario.password = usuarioRequestDto.password;
        usuario.estado = usuarioRequestDto.estado;
        usuario.username = usuarioRequestDto.username;
        return usuario;
    }
}