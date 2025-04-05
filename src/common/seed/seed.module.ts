import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { SeedService } from './seed.service';
import { EmpresaFactoryService } from './factory/empresa-factory.service';
import { HorarioFactoryService } from './factory/horario-factory.service';
import { UsuarioFactoryService } from './factory/usuario-factory.service';

@Module({
    imports: [TypeOrmModule.forFeature(entities)],
    providers: [SeedService, EmpresaFactoryService, HorarioFactoryService, UsuarioFactoryService],
    exports: [SeedService]
})
export class SeedModule {}
