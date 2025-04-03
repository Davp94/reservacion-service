import { Global, Module } from '@nestjs/common';
import { ReporteController } from './reporte.controller';
import { ReporteService } from './reporte.service';

@Global()
@Module({
  controllers: [ReporteController],
  providers: [ReporteService],
  exports: [ReporteService]
})
export class ReporteModule {}
