import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservacion } from 'src/entity/reservacion.entity';
import { EntityManager, Repository } from 'typeorm';
import { ReservacionResponseDto } from '../dto/reservacion.response.dto';
import { HorarioService } from 'src/feature/horario/service/horario.service';
import { ReservacionRequestDto } from '../dto/reservacion.request.dto';
import { Horario } from 'src/entity/horario.entity';
import { Usuario } from 'src/entity/usuario.entity';
import { PaginationFilterRequestDto } from 'src/common/dto/pagination-filter.request.dto';
import { PaginationFilterResponseDto } from 'src/common/dto/pagination-filter.response.dto';
import { OrderEnum } from 'src/constant/order.enum';

@Injectable()
export class ReservacionService {
  constructor(
    @InjectRepository(Reservacion)
    private reservacionRepository: Repository<Reservacion>,
    private horarioService: HorarioService,
    private entityManager: EntityManager,
  ) {}

  async getAllReservacionByUsuario(
    usuarioId: number,
  ): Promise<ReservacionResponseDto[]> {
    const reservacionsResponseDto: ReservacionResponseDto[] = [];
    const reservacions: Reservacion[] = await this.reservacionRepository.find({
      where: { usuario: { id: usuarioId } },
      relations: { usuario: true, horario: true },
    });
    for (const reservacion of reservacions) {
      const reservacionResponse =
        ReservacionResponseDto.buildFromEntity(reservacion);
      reservacionResponse.horario = await this.horarioService.getHorarioById(
        reservacion.horario.id,
      );
      reservacionsResponseDto.push(reservacionResponse);
    }
    return reservacionsResponseDto;
  }

  async getReservacionesPagination(
    paginationFilterRequestDto: PaginationFilterRequestDto
  ): Promise<PaginationFilterResponseDto<ReservacionResponseDto>> {
    const reservacionsResponseDto: ReservacionResponseDto[] = [];
    //TODO COMPLETE PAGINATION
    const order = {} // comentario : DESC
    order[paginationFilterRequestDto.sortBy] = paginationFilterRequestDto.order;
    //SINGLE FIELDS SOLUTION
    //comentario = ASC => {comentario: ASC}
    //MULTI FIELDS SOLUTION
    //[{comentario: ASC}, {fecha: DESC}] => {comentario: ASC, fecha: DESC, ....}
    //{'comentario'= 'DESC'}
    const [items, total] = await this.reservacionRepository.findAndCount({
      take: paginationFilterRequestDto.take,
      order: order,
      skip: (paginationFilterRequestDto.page - 1) * paginationFilterRequestDto.take, //page = 5   4*10 = 40    
    })
    for (const reservacion of items) {
      const reservacionResponse =
        ReservacionResponseDto.buildFromEntity(reservacion);
      reservacionResponse.horario = await this.horarioService.getHorarioById(
        reservacion.horario.id,
      );
      reservacionsResponseDto.push(reservacionResponse);
    }


    return {
      content: reservacionsResponseDto,
      totalItems: total,
      page: paginationFilterRequestDto.page,
      take: paginationFilterRequestDto.take,
      totalPages: Math.ceil(total / paginationFilterRequestDto.take),
    }
  }


  async createReservacion(
    reservacionRequest: ReservacionRequestDto,
  ): Promise<ReservacionResponseDto> {
    try {
      const reservacionToCreate: Reservacion = ReservacionRequestDto.buildToEntity(reservacionRequest);
      reservacionToCreate.id = (await this.reservacionRepository.count()) + 1;
      const horarioRetrieved: Horario = await this.entityManager.findOne(Horario, {where: {id: reservacionRequest.horarioId}});  
      reservacionToCreate.horario = horarioRetrieved;
      const usuarioRetrieved: Usuario = await this.entityManager.findOne(Usuario, {where: {id: reservacionRequest.usuarioId}});
      reservacionToCreate.usuario = usuarioRetrieved;
      return ReservacionResponseDto.buildFromEntity(
        await this.reservacionRepository.save(reservacionToCreate),
      );
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la reservacion');
    }
  }

//   async validateReservacion(reservacionToValid: any): Promise<boolean> {
//     const isNotDuplicateEmail: boolean = await this.usuarioRepository.exists({
//       where: {correo: userDataToValid.correo} ,
//     });
//     //TODO add validation isnOduplicate username - password
//     const uniqueUsername: boolean = true;
//     //valid with external service
//     const externalServiceValidation: boolean = true;
//     // ...
//     return !isNotDuplicateEmail && uniqueUsername && externalServiceValidation;
//   }
}
