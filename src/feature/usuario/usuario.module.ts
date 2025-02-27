import { Module } from '@nestjs/common';
import { UsuarioService } from './service/usuario.service';
import { UsuarioController } from './controller/usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';

@Module({
  providers: [UsuarioService],
  controllers: [UsuarioController],
  imports: [TypeOrmModule.forFeature(entities)]
})
export class UsuarioModule {}
