import { Controller, Get, Query } from '@nestjs/common';
import { HorarioService } from '../service/horario.service';
import { HorarioResponseDto } from '../dto/horario.response.dto';
import { EmpresaRequestDto } from 'src/feature/empresa/dto/empresa.request.dto';

@Controller('horario')
export class HorarioController {

  constructor(private horarioService: HorarioService) {}

  @Get()
  async getAllHorariosByEmpresaId(@Query() empresaRequestDto: EmpresaRequestDto): Promise<HorarioResponseDto[]> {
    return await this.horarioService.getAllHorariosByEmpresa(empresaRequestDto.id);
  }
}
