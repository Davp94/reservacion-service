import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { EmpresaService } from './service/empresa.service';
import { EmpresaController } from './controller/empresa.controller';

@Module({
  providers: [EmpresaService],
  controllers: [EmpresaController],
  imports: [TypeOrmModule.forFeature(entities)]
})
export class EmpresaModule {}
