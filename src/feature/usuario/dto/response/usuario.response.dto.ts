import { Usuario } from "src/entity/usuario.entity";

export class UsuarioResponseDto{

    id: number;
    nombres: string;
    apellidos: string;
    username: string;
    nombreCompleto: string;
    correo: string;
    estado: number;

    public static buildFromEntity(usuario: Usuario) {
        const usuarioResponseDto: UsuarioResponseDto = new UsuarioResponseDto();
        usuarioResponseDto.id = usuario.id;
        usuarioResponseDto.nombres = usuario.nombres;
        usuarioResponseDto.apellidos = usuario.apellidos;
        usuarioResponseDto.nombreCompleto = usuario.nombres+ ' '+usuario.apellidos
        usuarioResponseDto.correo = usuario.correo;
        usuarioResponseDto.estado = usuario.estado;
        usuarioResponseDto.username = usuario.username;
        return usuarioResponseDto;
    }
}