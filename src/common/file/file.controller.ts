import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileSizeValidationPipe } from '../pipe/file-validation.pipe';

@Controller('file')
export class FileController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
            const suffix = Date.now() + '_'+Math.round(Math.random()*1e9);
            const fileName = extname(file.originalname);
            callback(null, `${suffix}${fileName}`)
        }
    })
  }))
  uploadFile(@UploadedFile( new FileSizeValidationPipe(),) file: Express.Multer.File) {
    console.log(file);
    return {
        originalname: file.originalname,
        path: file.path,
        filename: file.filename
    }
  }

  //TODO add method to retrieve file
}
