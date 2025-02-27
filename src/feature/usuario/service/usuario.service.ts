import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/entity/rol.entity';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

    constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>) { }

    async getAllUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }

    async getAllUsuarioById(id: number): Promise<Usuario> {
        return await this.usuarioRepository.findOne({where: {id: id}});
    }

    async createUsuario(usuario: Usuario): Promise<Usuario>{
        return await this.usuarioRepository.save(usuario);
    }

    async updateUsuario(usuario: Usuario): Promise<Usuario>{
        const usuarioRetrieved: Usuario = await this.usuarioRepository.findOne({where: {id: usuario.id}});
        usuarioRetrieved.username = usuario.username;
        usuarioRetrieved.correo = usuario.correo;
        usuarioRetrieved.password = usuario.password;

        return await this.usuarioRepository.save(usuarioRetrieved);
    }

    async deleteUsuarioById(id: number): Promise<void> {
        this.usuarioRepository.delete(id);
    }
}
