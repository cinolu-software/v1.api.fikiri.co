import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StatusService } from './status.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { CreateStatusDto } from './dto/create-status.dto';
import { Status } from './entities/status.entity';
import { Public } from '../../../../common/decorators/public.decorator';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { RoleEnum } from '../../../core/auth/enums/role.enum';

@Public()
@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @Post()
  @Roles([RoleEnum.Admin])
  create(@Body() dto: CreateStatusDto): Promise<{ data: Status }> {
    return this.statusService.create(dto);
  }

  @Get()
  findAll(): Promise<{ data: Status[] }> {
    return this.statusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Status }> {
    return this.statusService.findOne(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, @Body() dto: UpdateStatusDto): Promise<{ data: Status }> {
    return this.statusService.update(+id, dto);
  }

  @Delete('id')
  @Roles([RoleEnum.Admin])
  delete(@Param('id') id: string): Promise<void> {
    return this.statusService.delete(+id);
  }
}
