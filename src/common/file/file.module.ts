import { Global, Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Global()
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          const suffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
          const fileName = extname(file.originalname);
          callback(null, `${suffix}${fileName}`);
        },
      }),
    }),
  ],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService, MulterModule],
})
export class FileModule {}
