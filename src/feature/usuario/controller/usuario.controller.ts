import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from 'src/entity/usuario.entity';
import { Repository } from 'typeorm';

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
    async createUsuario(@Body() usuario: Usuario) {
        return await this.usuarioService.createUsuario(usuario);
    }

    @Put()
    async updateUsuario(usuario: Usuario) {
        return await this.usuarioService.updateUsuario(usuario);
    }

    @Delete(':id')
    async deleteUsuarioById(@Param('id') id: number){
        this.usuarioService.deleteUsuarioById(id);
    }
}
