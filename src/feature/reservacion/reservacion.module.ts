import { Module } from '@nestjs/common';
import { ReservacionController } from './controller/reservacion.controller';
import { ReservacionService } from './service/reservacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { HorarioService } from '../horario/service/horario.service';
import { ReservacionGateway } from './gateway/reservacion.gateway';

@Module({
  controllers: [ReservacionController],
  providers: [ReservacionService, HorarioService, ReservacionGateway],
  imports: [TypeOrmModule.forFeature(entities)],
  exports: [ReservacionService, ReservacionGateway]
})
export class ReservacionModule {}
