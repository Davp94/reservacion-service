import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EmpresaResponseDto } from '../dto/empresa.response.dto';
import { EmpresaService } from '../service/empresa.service';
@Controller('empresa')
export class EmpresaController {

    constructor(private empresaService: EmpresaService){       
    }

    @Get()
    async getAllEmpresas(): Promise<EmpresaResponseDto[]> {
        return await this.empresaService.getAllEmpresas();
    }
}
