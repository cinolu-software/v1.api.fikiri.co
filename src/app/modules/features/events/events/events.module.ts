import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EcentsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { ImagesModule } from '../../../utilities/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), ImagesModule],
  controllers: [EcentsController],
  providers: [EventsService]
})
export class EventsModule {}
