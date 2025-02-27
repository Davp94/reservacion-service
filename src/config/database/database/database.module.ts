import { Global, Module } from '@nestjs/common';
import { databaseConfig } from './database.config';

@Global()
@Module({
  providers: [...databaseConfig],
  exports: [...databaseConfig],
})
export class DatabaseModule {}