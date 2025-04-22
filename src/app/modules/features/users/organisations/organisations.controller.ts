import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { OrganisationsService } from './organisations.service';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { Organisation } from './entities/organisation.entity';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { RoleEnum } from '../../../core/auth/enums/role.enum';

@Controller('organisations')
export class OrganisationsController {
  constructor(private readonly organisationsService: OrganisationsService) {}

  @Post()
  @Roles([RoleEnum.Admin])
  create(@Body() dto: CreateOrganisationDto): Promise<{ data: Organisation }> {
    return this.organisationsService.create(dto);
  }

  @Get()
  findAll(): Promise<{ data: Organisation[] }> {
    return this.organisationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Organisation }> {
    return this.organisationsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, @Body() dto: UpdateOrganisationDto): Promise<{ data: Organisation }> {
    return this.organisationsService.update(+id, dto);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.organisationsService.remove(+id);
  }
}
