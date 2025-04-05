import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsuarioFactoryService } from './factory/usuario-factory.service';
import { HorarioFactoryService } from './factory/horario-factory.service';
import { EmpresaFactoryService } from './factory/empresa-factory.service';
import { Repository } from 'typeorm';
import { Rol } from 'src/entity/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SeedService implements OnModuleInit{


    constructor(
        private usuarioFactory: UsuarioFactoryService,
        private horarioFactory: HorarioFactoryService,
        private empresaFactory: EmpresaFactoryService,
        @InjectRepository(Rol) private rolRepository: Repository<Rol>
    ) {

    }
    onModuleInit() {
       this.seedData()
    }

    async seedData() {
        //CREATE ROLES
        const existingRoles = await this.rolRepository.find();
        if(existingRoles.length === 0){
            const roles: Rol[] = [
                { id: 1, nombre: 'Administrador', descripcion: 'Rol admin acceso total', estado: 1},
                { id: 2, nombre: 'Representante', descripcion: 'Rol representante de la empresa', estado: 1},
                { id: 3, nombre: 'Usuario', descripcion: 'Usuario que realiza reservaciones', estado: 1},
            ]
            await this.rolRepository.save(roles);
        }
        //CREATE USUARIOS
        const usuarios = await this.usuarioFactory.createUsuarios(10);
        //CREATE EMPRESAS
        //CREATE HORARIOS
    }
}
