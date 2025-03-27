import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { HorarioController } from './controller/horario.controller';
import { HorarioService } from './service/horario.service';

@Module({
    providers: [HorarioService],
    controllers: [HorarioController],
    imports: [TypeOrmModule.forFeature(entities)]
})
export class HorarioModule {}
