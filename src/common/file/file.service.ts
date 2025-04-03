import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  private readonly uploadDir = './upload';

  constructor() {}

  async processFile(file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('Error al encontrar el archivo');
      }
      const relativePath = `/upload/${file.filename}`
      return file.filename;
    } catch (error) {
      throw error;
    }
  }

  async deleteFile(filePath: string){
    console.log("🚀 ~ FileService ~ deleteFile ~ filePath:", filePath)
    try {
        const fullPath = join(process.cwd(), filePath.replace(/^\/upload/, 'upload'))
        console.log("🚀 ~ FileService ~ deleteFile ~ fullPath:", fullPath)
        if(existsSync(fullPath)) {
            unlinkSync(fullPath)
            return true;
        }
        return false;
    } catch (error) {
        throw new BadRequestException('Error al borrar el archivo'); 
    }
  }
}
