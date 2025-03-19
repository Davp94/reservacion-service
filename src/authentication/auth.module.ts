import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from 'src/entity';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import * as fs from 'fs';
import * as path from 'path';
@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature(entities),
    JwtModule.registerAsync({
      useFactory: async() => {
        const options: JwtModuleOptions = {
          privateKey: fs.readFileSync(path.join(__dirname, 'key/key_rsa.pem'), 'utf-8'),
          publicKey: fs.readFileSync(path.join(__dirname, 'key/key_rsa-pub.pem'), 'utf-8'),
          signOptions: {
            algorithm: 'RS256',
          }
        }
        return options;
      },
    })
  ]
})
export class AuthModule {}
