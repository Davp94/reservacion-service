import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './feature/usuario/usuario.module';
import { DatabaseModule } from './config/database/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database/database/database.config';
import { entities } from './entity';

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
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
