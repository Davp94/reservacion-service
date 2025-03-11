import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';
import { UsuarioRequestDto } from '../dto/request/usuario.request.dto';

@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService){       
    }

    @Get()
    async getAllUsuarios() {
        return await this.usuarioService.getAllUsuarios();
    }

    @Get(':id')
    async getAllUsuarioById(@Param('id') id: number) { 
        return await this.usuarioService.getAllUsuarioById(id);
    }

    @Post()
    async createUsuario(@Body() usuario: UsuarioRequestDto) {
        return await this.usuarioService.createUsuario(usuario);
    }

    @Put(':id')
    async updateUsuario(@Param('id') id: number, @Body() usuario: UsuarioRequestDto) {
        return await this.usuarioService.updateUsuario(id, usuario);
    }

    @Delete(':id')
    async deleteUsuarioById(@Param('id') id: number){
        this.usuarioService.deleteUsuarioById(id);
    }
}
