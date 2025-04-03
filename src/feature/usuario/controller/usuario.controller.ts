import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioRequestDto } from '../dto/request/usuario.request.dto';
import { UsuarioResponseDto } from '../dto/response/usuario.response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileSizeValidationPipe } from 'src/common/pipe/file-validation.pipe';
import { FileService } from 'src/common/file/file.service';

@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService, private fileService: FileService){       
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
    @UseInterceptors(FileInterceptor('file'))
    async createUsuario(@Body() usuario: UsuarioRequestDto, @UploadedFile( new FileSizeValidationPipe())file: Express.Multer.File): Promise<UsuarioResponseDto> {
        try {
            return await this.usuarioService.createUsuario(usuario, file);
        } catch (error) {
            //TODO debug why method dont entry here
            if(file && file.filename){
                await this.fileService.deleteFile(file.filename);
            }
            throw error;
        }    
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
