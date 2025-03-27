import { Module } from '@nestjs/common';
import { ReservacionController } from './controller/reservacion.controller';
import { ReservacionService } from './service/reservacion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';

@Module({
  controllers: [ReservacionController],
  providers: [ReservacionService],
  imports: [TypeOrmModule.forFeature(entities)]
})
export class ReservacionModule {}
