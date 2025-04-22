import { Module } from '@nestjs/common';
import { PolesService } from './poles.service';
import { PolesController } from './poles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pole } from './entities/pole.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pole])],
  controllers: [PolesController],
  providers: [PolesService]
})
export class PolesModule {}
