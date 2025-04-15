import { Global, Module } from '@nestjs/common';
import { ReporteController } from './reporte.controller';
import { ReporteService } from './reporte.service';
import { ReservacionService } from '../reservacion/service/reservacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { HorarioService } from '../horario/service/horario.service';

@Global()
@Module({
  controllers: [ReporteController],
  providers: [ReporteService, ReservacionService, HorarioService],
  exports: [ReporteService],
  imports: [TypeOrmModule.forFeature(entities)]
})
export class ReporteModule {}
