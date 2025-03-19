import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/entity/rol.entity';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioRequestDto } from '../dto/request/usuario.request.dto';
import { UsuarioResponseDto } from '../dto/response/usuario.response.dto';
import { CryptoService } from 'src/common/crypto/crypto.service';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
        private cryptoService: CryptoService
    ) { }

    async getAllUsuarios(): Promise<UsuarioResponseDto[]> {
        const usuarioResponseDto: UsuarioResponseDto[] = [];
        const usuarios: Usuario[] = await this.usuarioRepository.find();
        for(const usuario of usuarios){
            usuarioResponseDto.push(UsuarioResponseDto.buildFromEntity(usuario))
        }
        return usuarioResponseDto;
    }

    async getAllUsuarioById(id: number): Promise<UsuarioResponseDto> {
        return UsuarioResponseDto.buildFromEntity(await this.usuarioRepository.findOne({where: {id: id}}));
    }

    async createUsuario(usuario: UsuarioRequestDto): Promise<UsuarioResponseDto>{
        if(!this.validateUser(usuario)){
            throw new Error('Error validando el usuario')
        }
        const usuarioBuilded: Usuario = UsuarioRequestDto.buildToEntity(usuario);
        usuarioBuilded.password = await this.cryptoService.encryptData(usuarioBuilded.password);
        return UsuarioResponseDto.buildFromEntity(await this.usuarioRepository.save(usuarioBuilded));
    }

    async updateUsuario(id: number, usuario: UsuarioRequestDto): Promise<UsuarioResponseDto>{
        const usuarioRetrieved: Usuario = await this.usuarioRepository.findOne({where: {id}});
        usuarioRetrieved.username = usuario.username;
        usuarioRetrieved.correo = usuario.correo;
        usuarioRetrieved.password = usuario.password;

        return UsuarioResponseDto.buildFromEntity(await this.usuarioRepository.save(usuarioRetrieved));
    }

    async deleteUsuarioById(id: number): Promise<void> {
        this.usuarioRepository.delete(id);
    }

    async validateUser(userDataToValid: any): Promise<boolean>{
        const isNotDuplicateEmail: boolean = await this.usuarioRepository.exists({where: userDataToValid.correo})
        //valid unique username
        const uniqueUsername: boolean = true;
        //valid with external service
        const externalServiceValidation: boolean = true;
        // ...
        return isNotDuplicateEmail && uniqueUsername && externalServiceValidation;
    }
}
