import { MiddlewareConsumer, Module, OnModuleInit, ValidationPipe } from '@nestjs/common';
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
import { EmpresaModule } from './feature/empresa/empresa.module';
import { HorarioModule } from './feature/horario/horario.module';
import { ReservacionModule } from './feature/reservacion/reservacion.module';
import { FileModule } from './common/file/file.module';
import { ReporteModule } from './feature/reporte/reporte.module';
import { SeedModule } from './common/seed/seed.module';
import { SeedService } from './common/seed/seed.service';
import { ReservacionGateway } from './feature/reservacion/gateway/reservacion.gateway';

@Module({
  imports: [UsuarioModule, DatabaseModule, EmpresaModule, TypeOrmModule.forRoot(
    {
      type: 'postgres',
      host: 'dpg-d0050dc9c44c73ffn900-a',
      port: 5432,
      username: 'postgree',
      password: '123MrCSJucPvRJSTS3EIXgQmFpy4oXELh0j456',
      database: 'reservacion_db',
      entities: entities,
      synchronize: true,
    }
  ), CryptoModule, AuthModule, HorarioModule, ReservacionModule, FileModule, ReporteModule, SeedModule],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule implements OnModuleInit{

  constructor(private readonly seedService: SeedService){
    
  }
  async onModuleInit() {
    await this.seedService.seedData();
  }
  configure(consumer: MiddlewareConsumer){
    consumer.apply(AuthMiddleware).forRoutes(
      UsuarioController
    )
    //ADD OTHER MIDDLEWARE
    //consumer.apply(AuthMiddleware).forRoutes()
  }
}
