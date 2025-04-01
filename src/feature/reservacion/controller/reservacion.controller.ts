import { Controller, Get, Query } from '@nestjs/common';
import { ReservacionService } from '../service/reservacion.service';
import { ReservacionRequestDto } from '../dto/reservacion.request.dto';
import { PaginationFilterResponseDto } from 'src/common/dto/pagination-filter.response.dto';
import { ReservacionResponseDto } from '../dto/reservacion.response.dto';
import { PaginationFilterRequestDto } from 'src/common/dto/pagination-filter.request.dto';

@Controller('reservacion')
export class ReservacionController {

    constructor(private reservacionService: ReservacionService){

    }

    @Get('page')
    async getAllUsuarioById(@Query() paginationFilterRequestDto: PaginationFilterRequestDto): Promise<PaginationFilterResponseDto<ReservacionResponseDto>> { 
        return await this.reservacionService.getReservacionesPagination(paginationFilterRequestDto);
    }
}
