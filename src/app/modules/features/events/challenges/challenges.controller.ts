import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Challenge } from './entities/challenge.entity';
import { ChallengesService } from './challenges.service';
import { Public } from '../../../../common/decorators/public.decorator';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { RoleEnum } from '../../../core/auth/enums/role.enum';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @Roles([RoleEnum.Admin])
  create(@Body() createChallengeDto: CreateChallengeDto): Promise<{ data: Challenge }> {
    return this.challengesService.create(createChallengeDto);
  }

  @Public()
  @Get()
  findAll(): Promise<{ data: Challenge[] }> {
    return this.challengesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Challenge }> {
    return this.challengesService.findOne(+id);
  }

  @Get('thematic/:id')
  findByThematic(@Param('id') id: string): Promise<{ data: Challenge[] }> {
    return this.challengesService.findByThematic(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, @Body() updateChallengeDto: UpdateChallengeDto): Promise<{ data: Challenge }> {
    return this.challengesService.update(+id, updateChallengeDto);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.challengesService.remove(+id);
  }
}
