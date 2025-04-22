import { CreateSolutionDto } from './create-solution.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';

export class UpdateSolutionDto extends PartialType<CreateSolutionDto>(CreateSolutionDto) {
  @IsOptional()
  pole: number;

  @IsOptional()
  status: number;
}
