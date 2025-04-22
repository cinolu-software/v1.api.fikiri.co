import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserSolutionDto {
  @IsNotEmpty({ message: 'Le nom de la solution est obligatoire' })
  name: string;

  @IsOptional()
  video_link: string;

  @IsNotEmpty({ message: 'La description de la solution est obligatoire' })
  description: string;

  @IsNotEmpty({ message: 'Le problème ciblé par la solution est obligatoire' })
  targetedProblem: string;
}
