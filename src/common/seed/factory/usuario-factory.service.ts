import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/entity/rol.entity';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { CryptoService } from 'src/common/crypto/crypto.service';

@Injectable()
export class UsuarioFactoryService {

    constructor(@InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
    @InjectRepository(Rol) private rolRepository: Repository<Rol>, private cryptoService: CryptoService){

    }

    async createUsuarios(cantidad: number): Promise<Usuario[]> {
        const roles = await this.rolRepository.find();
        const usuarios = [];
        for(let i = 0; i< cantidad; i++){
            usuarios.push(await this.createUsuario(roles));
        }
        return usuarios;
    }

    async createUsuario(roles: Rol[]): Promise<Usuario> {
        const firstName = faker.person.firstName() + ' '+ faker.person.firstName()
        const lastName = faker.person.lastName() + ' '+ faker.person.lastName()
        const usuario: Usuario = new Usuario();
        usuario.id = (await this.usuarioRepository.count()) +1
        usuario.nombres = firstName;
        usuario.apellidos = lastName;
        usuario.correo = faker.internet.email({firstName, lastName}),
        usuario.estado = faker.helpers.arrayElement([0,1]),
        usuario.avatar = faker.image.avatar(),
        usuario.password = await this.cryptoService.encryptData('123456aA!'),
        usuario.username = faker.internet.username({firstName, lastName })
        usuario.rol = roles[Math.floor(Math.random() * roles.length)]

        return this.usuarioRepository.save(usuario);
    }
}
