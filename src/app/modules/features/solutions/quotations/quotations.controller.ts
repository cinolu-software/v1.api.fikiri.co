import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { QuotationsService } from './quotations.service';
import { CreateLableDto } from './dto/create-quotation.dto';
import { UpdateLableDto } from './dto/update-quotation.dto';
import { Quotation } from './entities/quotation.entity';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { RoleEnum } from '../../../core/auth/enums/role.enum';

@Controller('quotations')
export class QuotationsController {
  constructor(private readonly lablesService: QuotationsService) {}

  @Post('')
  @Roles([RoleEnum.Admin, RoleEnum.Curator])
  create(@Body() createLableDto: CreateLableDto): Promise<{ data: Quotation }> {
    return this.lablesService.create(createLableDto);
  }

  @Get('')
  findAll(): Promise<{ data: Quotation[] }> {
    return this.lablesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Quotation }> {
    return this.lablesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLableDto: UpdateLableDto): Promise<{ data: Quotation }> {
    return this.lablesService.update(+id, updateLableDto);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.lablesService.remove(+id);
  }
}
