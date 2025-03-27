import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Horario } from 'src/entity/horario.entity';
import { Repository } from 'typeorm';
import { HorarioResponseDto } from '../dto/horario.response.dto';

@Injectable()
export class HorarioService {
      constructor(
        @InjectRepository(Horario) private horarioRepository: Repository<Horario>,
      ) {}

      async getHorarioById(id: number): Promise<HorarioResponseDto> {
        const horario: Horario = await this.horarioRepository.findOne({where: {id: id}, relations: { empresa: true }});

        return HorarioResponseDto.buildFromEntity(horario);
      }
    
      async getAllHorariosByEmpresa(id: number): Promise<HorarioResponseDto[]> {
        const horariosResponseDto: HorarioResponseDto[] = [];
        const horarios: Horario[] = await this.horarioRepository.find({where: {empresa: {id: id}, estado: 2}, relations: { empresa: true }});
        for (const horario of horarios) {
            horariosResponseDto.push(HorarioResponseDto.buildFromEntity(horario));
        }
        return horariosResponseDto;
      }

      async getAllHorariosByFecha(date: Date): Promise<HorarioResponseDto[]> {
        const horariosResponseDto: HorarioResponseDto[] = [];
        const horarios: Horario[] = await this.horarioRepository.find({where: {fecha: date}, relations: { empresa: true }});
        for (const horario of horarios) {
            horariosResponseDto.push(HorarioResponseDto.buildFromEntity(horario));
        }
        return horariosResponseDto;
      }
}
