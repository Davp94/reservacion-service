import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './feature/usuario/usuario.module';
import { DatabaseModule } from './config/database/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entity';
import { CryptoModule } from './common/crypto/crypto.module';
import { AuthModule } from './authentication/auth.module';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './exception/exception.filter';
import { AuthMiddleware } from './common/auth/auth.middleware';
import { UsuarioController } from './feature/usuario/controller/usuario.controller';

@Module({
  imports: [UsuarioModule, DatabaseModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'reservacion2_db',
      entities: entities,
      synchronize: true,
    }
  ), CryptoModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(
      UsuarioController
    )
    //ADD OTHER MIDDLEWARE
    //consumer.apply(AuthMiddleware).forRoutes()
  }
}
