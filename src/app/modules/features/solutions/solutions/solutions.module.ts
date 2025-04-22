import { Module } from '@nestjs/common';
import { SolutionsService } from './solutions.service';
import { SolutionsController } from './solutions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Solution } from './entities/solution.entity';
import { ImagesModule } from '../../../utilities/images/images.module';
import { SearchModule } from '../../../utilities/search/search.module';

@Module({
  imports: [ImagesModule, SearchModule, TypeOrmModule.forFeature([Solution])],
  controllers: [SolutionsController],
  providers: [SolutionsService],
  exports: [SolutionsService]
})
export class SolutionsModule {}
