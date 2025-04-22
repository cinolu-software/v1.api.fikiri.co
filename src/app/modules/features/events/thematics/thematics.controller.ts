import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ThematicsService } from './thematics.service';
import { CreateThematicDto } from './dto/create-thematic.dto';
import { UpdateThematicDto } from './dto/update-thematic.dto';
import { Thematic } from './entities/thematic.entity';
import { Public } from '../../../../common/decorators/public.decorator';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { RoleEnum } from '../../../core/auth/enums/role.enum';

@Controller('thematics')
export class ThematicsController {
  constructor(private readonly thematicsService: ThematicsService) {}

  @Post('')
  @Roles([RoleEnum.Admin])
  create(@Body() createThematicDto: CreateThematicDto): Promise<{ data: Thematic }> {
    return this.thematicsService.create(createThematicDto);
  }

  @Public()
  @Get('event/:eventId')
  findByEvent(@Param('eventId') eventId: string): Promise<{ data: Thematic[] }> {
    return this.thematicsService.findByEvent(+eventId);
  }

  @Public()
  @Get('')
  findAll(): Promise<{ data: Thematic[] }> {
    return this.thematicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Thematic }> {
    return this.thematicsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, @Body() data: UpdateThematicDto): Promise<{ data: Thematic }> {
    return this.thematicsService.update(+id, data);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.thematicsService.remove(+id);
  }
}
