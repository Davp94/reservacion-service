import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ReservacionService } from '../service/reservacion.service';
import { ReservacionRequestDto } from '../dto/reservacion.request.dto';
import { PaginationFilterResponseDto } from 'src/common/dto/pagination-filter.response.dto';
import { ReservacionResponseDto } from '../dto/reservacion.response.dto';
import { PaginationFilterRequestDto } from 'src/common/dto/pagination-filter.request.dto';

@Controller('reservacion')
export class ReservacionController {

    constructor(private reservacionService: ReservacionService){

    }

    @Post('page')
    async getAllUsuarioById(@Body() paginationFilterRequestDto: PaginationFilterRequestDto): Promise<PaginationFilterResponseDto<ReservacionResponseDto>> { 
        console.log("🚀 ~ ReservacionController ~ getAllUsuarioById ~ paginationFilterRequestDto:", paginationFilterRequestDto)
        try {
            return await this.reservacionService.getReservacionesPagination(paginationFilterRequestDto);
        } catch (error) {
            console.log("🚀 ~ ReservacionController ~ getAllUsuarioById ~ error:", error)
            throw error;
        }
        
    }

    @Post()
    async createReservacion(@Body() reservacionRequestDto: ReservacionRequestDto){
        console.log("🚀 ~ ReservacionController ~ createReservacion ~ reservacionRequestDto:", reservacionRequestDto)
        try {
            return await this.reservacionService.createReservacion(reservacionRequestDto);
        } catch (error) {
            console.log("🚀 ~ ReservacionController ~ createReservacion ~ error:", error)
            throw error;
        }
       
    }
}
