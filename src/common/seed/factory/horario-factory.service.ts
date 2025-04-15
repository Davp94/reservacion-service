import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from 'src/entity/empresa.entity';
import { Horario } from 'src/entity/horario.entity';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

@Injectable()
export class HorarioFactoryService {
  constructor(
    @InjectRepository(Empresa) private empresaRepository: Repository<Empresa>,
    @InjectRepository(Horario) private horarioRepository: Repository<Horario>,
  ) {}

  async createHorarios(cantidad: number): Promise<Horario[]> {
    if ((await this.horarioRepository.find()).length === 0) {
      const empresas = await this.empresaRepository.find();
      const horarios = [];
      for (let i = 0; i < cantidad; i++) {
        horarios.push(await this.createHorario(empresas));
      }
      return horarios;
    }
  }

  async createHorario(empresas: Empresa[]): Promise<Horario> {
    const hourStart = faker.number.int({ min: 8, max: 17 });
    const hourEnd = faker.number.int({
      min: hourStart + 1,
      max: hourStart + 3,
    });
    const horario: Horario = new Horario();
    horario.id = (await this.horarioRepository.count()) + 1;
    horario.empresa = empresas[Math.floor(Math.random() * empresas.length)];
    horario.estado = faker.helpers.arrayElement([0, 1]);
    horario.fecha = faker.date.recent();
    horario.hora_inicio = `${String(hourStart).padStart(2, '0')}:00`;
    horario.hora_fin = `${String(hourEnd).padStart(2, '0')}:00`;

    return this.horarioRepository.save(horario);
  }
}
