import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { CreateSolutionDto } from './dto/create-solution.dto';
import { UpdateSolutionDto } from './dto/update-solution.dto';
import { UpdateUserSolutionDto } from './dto/update-user-solution.dto';
import { Solution } from './entities/solution.entity';
import { QueryParams } from './types/query-params.interface';
import { SearchParams, SearchResponse } from 'meilisearch';
import { Public } from '../../../../common/decorators/public.decorator';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../../common/decorators/user.decorator';
import { RoleEnum } from '../../../core/auth/enums/role.enum';
import { User } from '../../../core/users/entities/user.entity';

@Controller('solutions')
export class SolutionsController {
  constructor(private readonly solutionsService: SolutionsService) {}

  @Public()
  @Get('search')
  search(@Query('q') query: string): Promise<{ data: SearchResponse<Record<string, any>, SearchParams> }> {
    return this.solutionsService.search(query);
  }

  @Get('user')
  findByUser(@CurrentUser() user: User): Promise<{ data: Solution[] }> {
    return this.solutionsService.findByUser(user);
  }

  @Get('add-document')
  addDocument(): Promise<void> {
    return this.solutionsService.addDocument();
  }

  @Post('')
  create(@Body() dto: CreateSolutionDto, @CurrentUser() user: User): Promise<{ data: Solution }> {
    return this.solutionsService.create(dto, user);
  }

  @Get('')
  findAll(): Promise<{ data: Solution[] }> {
    return this.solutionsService.findAll();
  }

  @Delete(':id/image/:imageId')
  deleteImage(@Param('id') id: string, @Param('imageId') imageId: string): Promise<{ data: Solution }> {
    return this.solutionsService.deleteImage(+id, +imageId);
  }

  @Public()
  @Get('mapped')
  findMapped(@Query() queryParams: QueryParams): Promise<{ data: [Solution[], number] }> {
    return this.solutionsService.findMapped(queryParams);
  }

  @Public()
  @Get('winning-solutions')
  finWinningSolutions(): Promise<{ data: Solution[] }> {
    return this.solutionsService.findWinningSolutions();
  }

  @Public()
  @Get('mapped/:id')
  findOneMapped(@Param('id') id: string): Promise<{ data: { solution: Solution; prev: number; next: number } }> {
    return this.solutionsService.findOneMapped(+id);
  }

  @Get('pole/:id')
  getByPole(@Param('id') id: string): Promise<{ data: Solution[] }> {
    return this.solutionsService.findByPole(+id);
  }

  @Get('conforms')
  findConforms(): Promise<{ data: Solution[] }> {
    return this.solutionsService.findConforms();
  }

  @Public()
  @Get('curated')
  findCurated(): Promise<{ data: Solution[] }> {
    return this.solutionsService.findCurated();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: { solution: Solution; prev: number; next: number } }> {
    return this.solutionsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, @Body() data: UpdateSolutionDto): Promise<{ data: Solution }> {
    return this.solutionsService.update(+id, data);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.solutionsService.remove(+id);
  }

  @Patch('user/:id')
  updateUserSolution(@Param('id') id: string, @Body() data: UpdateUserSolutionDto): Promise<{ data: Solution }> {
    return this.solutionsService.userUpdateSolution(+id, data);
  }

  @UseInterceptors(
    FileInterceptor('thumb', {
      storage: diskStorage({
        destination: './uploads/solutions',
        filename: function (_req, file, cb) {
          cb(null, `${uuidv4()}.${file.mimetype.split('/')[1]}`);
        }
      })
    })
  )
  @Post('image/:id')
  uploadImage(@Param('id') id: string, @UploadedFile() file: Express.Multer.File): Promise<{ data: Solution }> {
    return this.solutionsService.uploadImage(+id, file);
  }
}
