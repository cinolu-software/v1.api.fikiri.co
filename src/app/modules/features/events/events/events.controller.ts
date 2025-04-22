import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateCallDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Public } from '../../../../common/decorators/public.decorator';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { RoleEnum } from '../../../core/auth/enums/role.enum';

@Controller('events')
export class EcentsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('')
  @Roles([RoleEnum.Admin])
  create(@Body() createCallsDto: CreateEventDto): Promise<{ data: Event }> {
    return this.eventsService.create(createCallsDto);
  }

  @Public()
  @Get('')
  findAll(): Promise<{ data: Event[] }> {
    return this.eventsService.findAll();
  }

  @Public()
  @Get('recent')
  findRecent(): Promise<{ data: { call: Event; prev: number; next: number } }> {
    return this.eventsService.findRecent();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: { event: Event; prev: number; next: number } }> {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, @Body() updateCallsDto: UpdateCallDto): Promise<{ data: Event }> {
    return this.eventsService.update(+id, updateCallsDto);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.eventsService.remove(+id);
  }

  @UseInterceptors(
    FilesInterceptor('thumbs', 4, {
      storage: diskStorage({
        destination: './uploads/events',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  @Post(':id/images')
  uploadImage(@Param('id') id: string, @UploadedFiles() files: Express.Multer.File[]): Promise<void> {
    return this.eventsService.uploadImage(+id, files);
  }
}
