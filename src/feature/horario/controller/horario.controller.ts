import { Controller, Get, Query } from '@nestjs/common';
import { HorarioService } from '../service/horario.service';
import { HorarioResponseDto } from '../dto/horario.response.dto';

@Controller('horario')
export class HorarioController {

  constructor(private horarioService: HorarioService) {}

  @Get()
  async getAllHorariosByEmpresaId(@Query() id: number): Promise<HorarioResponseDto[]> {
    return await this.horarioService.getAllHorariosByEmpresa(id);
  }
}
