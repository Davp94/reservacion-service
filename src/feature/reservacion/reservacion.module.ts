import { Module } from '@nestjs/common';
import { ReservacionController } from './controller/reservacion.controller';
import { ReservacionService } from './service/reservacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { HorarioService } from '../horario/service/horario.service';

@Module({
  controllers: [ReservacionController],
  providers: [ReservacionService, HorarioService],
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [ReservacionService]
})
export class ReservacionModule {}
