import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileSizeValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if(!file) {
        throw new BadRequestException('Archivo es requerido')
    }
    //validar tipo de archivo
    const allowedTypes = ['image/jpeg', 'image/png']
    if(!allowedTypes.includes(file.mimetype)){
        throw new BadRequestException('Tipo de archivo no valido')
    }

    //validar tamaño
    const maxSize = 1*1024*1024 // 1MB
    if(file.size > maxSize){
        throw new BadRequestException(`Tamaño de archivo excedido. Maximo permitido ${maxSize/1024/1024} MB`)
    }
    return file;
  }
}