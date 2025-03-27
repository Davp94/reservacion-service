import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from 'src/entity/rol.entity';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';
import { Empresa } from 'src/entity/empresa.entity';
import { EmpresaResponseDto } from '../dto/empresa.response.dto';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa) private empresaRepository: Repository<Empresa>,
  ) {}

  async getAllEmpresas(): Promise<EmpresaResponseDto[]> {
    const empresasResponseDto: EmpresaResponseDto[] = [];
    const empresas: Empresa[] = await this.empresaRepository.find();
    for (const empresa of empresas) {
        empresasResponseDto.push(EmpresaResponseDto.buildFromEntity(empresa));
    }
    return empresasResponseDto;
  }
}
