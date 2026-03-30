import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
