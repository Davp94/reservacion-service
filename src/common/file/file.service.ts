import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {

    constructor(){}

    createFile(file: Express.Multer.File): string {
        return 'filename';
    }
}
