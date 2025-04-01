import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioRequestDto } from '../dto/request/usuario.request.dto';
import { UsuarioResponseDto } from '../dto/response/usuario.response.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService){       
    }

    @Get()
    async getAllUsuarios(): Promise<UsuarioResponseDto[]> {
        return await this.usuarioService.getAllUsuarios();
    }

    @Get(':id')
    async getAllUsuarioById(@Param('id') id: number): Promise<UsuarioResponseDto> { 
        return await this.usuarioService.getAllUsuarioById(id);
    }

    @Post()
    async createUsuario(@Body() usuario: UsuarioRequestDto, file: Express.Multer.File): Promise<UsuarioResponseDto> {
        return await this.usuarioService.createUsuario(usuario);
    }

    @Put(':id')
    async updateUsuario(@Param('id') id: number, @Body() usuario: UsuarioRequestDto): Promise<UsuarioResponseDto> {
        return await this.usuarioService.updateUsuario(id, usuario);
    }

    @Delete(':id')
    async deleteUsuarioById(@Param('id') id: number){
        this.usuarioService.deleteUsuarioById(id);
    }
}
