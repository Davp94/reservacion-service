import { Injectable } from '@nestjs/common';
import { AuthRequestDto } from './dto/auth.request.dto';
import { AuthResponseDto } from './dto/auth.response.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';
import { CryptoService } from 'src/common/crypto/crypto.service';

@Injectable()
export class AuthService {

    constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private jwtService: JwtService, private cryptoService: CryptoService){}


    async authUser(authRequestDto: AuthRequestDto): Promise<AuthResponseDto> {
        //validate user
        if(!await this.validateUsuario(authRequestDto)){
            throw new Error('Error, credenciales de usuario invalidas')
        }
        //build data token
        const usuario: Usuario = await this.usuarioRepository.findOne({where: {username: authRequestDto.username}});
        const payload = { uid: usuario.id, correo: usuario.correo };
        //create and return token
        const token = await this.jwtService.signAsync(payload);
        const authResponse = new AuthResponseDto();
        authResponse.token = token;
        return authResponse;
    }

    async validateUsuario(credentials: AuthRequestDto): Promise<Boolean>{
        //search user
        const usuario: Usuario = await this.usuarioRepository.findOne({where: {username: credentials.username}});
        console.log("🚀 ~ AuthService ~ validateUsuario ~ usuario:", usuario)
        if(usuario){ 
            console.log("🚀 ~ AuthService ~ validateUsuario ~  await this.cryptoService.decryptData(usuario.password):",  await this.cryptoService.decryptData(usuario.password))
            return await this.cryptoService.decryptData(usuario.password) == credentials.password;
            //return usuario.password == credentials.password;
        }
        return false;
    }
}
