import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/entity/rol.entity';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioRequestDto } from '../dto/request/usuario.request.dto';
import { UsuarioResponseDto } from '../dto/response/usuario.response.dto';
import { CryptoService } from 'src/common/crypto/crypto.service';
import { FileService } from 'src/common/file/file.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    private cryptoService: CryptoService,
    private fileService: FileService
  ) {}

  async getAllUsuarios(): Promise<UsuarioResponseDto[]> {
    const usuarioResponseDto: UsuarioResponseDto[] = [];
    const usuarios: Usuario[] = await this.usuarioRepository.find();
    for (const usuario of usuarios) {
      usuarioResponseDto.push(UsuarioResponseDto.buildFromEntity(usuario));
    }
    return usuarioResponseDto;
  }

  async getAllUsuarioById(id: number): Promise<UsuarioResponseDto> {
    return UsuarioResponseDto.buildFromEntity(
      await this.usuarioRepository.findOne({ where: { id: id } }),
    );
  }

  async createUsuario(usuario: UsuarioRequestDto): Promise<UsuarioResponseDto> {
    try {
      if (!(await this.validateUser(usuario))) {
        throw new BadRequestException('Error validando el usuario');
      }
      //create file
      
      const usuarioBuilded: Usuario = UsuarioRequestDto.buildToEntity(usuario);
      usuarioBuilded.password = await this.cryptoService.encryptData(
        usuarioBuilded.password,
      );
      usuarioBuilded.id = (await this.usuarioRepository.count()) + 1;
      return UsuarioResponseDto.buildFromEntity(
        await this.usuarioRepository.save(usuarioBuilded),
      );
    } catch (error) {
      throw error;
    }
  }

  async updateUsuario(
    id: number,
    usuario: UsuarioRequestDto,
  ): Promise<UsuarioResponseDto> {
    const usuarioRetrieved: Usuario = await this.usuarioRepository.findOne({
      where: { id },
    });
    usuarioRetrieved.username = usuario.username;
    usuarioRetrieved.correo = usuario.correo;
    usuarioRetrieved.password = usuario.password;

    return UsuarioResponseDto.buildFromEntity(
      await this.usuarioRepository.save(usuarioRetrieved),
    );
  }

  //borrado fisico
  async deleteUsuarioById(id: number): Promise<void> {
    this.usuarioRepository.delete(id);
  }

  //borrado logico
  async deleteLogicUsuarioById(id: number): Promise<void> {
    const usuarioRetrieved: Usuario = await this.usuarioRepository.findOne({
      where: { id },
    });
    usuarioRetrieved.estado = 0; //INACTIVO
    await this.usuarioRepository.save(usuarioRetrieved);
  }

  async validateUser(userDataToValid: any): Promise<boolean> {
    const isNotDuplicateEmail: boolean = await this.usuarioRepository.exists({
      where: {correo: userDataToValid.correo} ,
    });
    //TODO add validation isnOduplicate username - password
    const uniqueUsername: boolean = true;
    //valid with external service
    const externalServiceValidation: boolean = true;
    // ...
    return !isNotDuplicateEmail && uniqueUsername && externalServiceValidation;
  }
}
