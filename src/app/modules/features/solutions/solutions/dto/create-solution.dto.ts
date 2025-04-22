import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSolutionDto {
  @IsNotEmpty({ message: 'Le nom de la solution est obligatoire' })
  name: string;

  @IsOptional()
  video_link: string;

  @IsNotEmpty({ message: 'La description de la solution est obligatoire' })
  description: string;

  @IsNotEmpty({ message: 'Le problème ciblé par la solution est obligatoire' })
  targeted_problem: string;

  @IsNotEmpty({ message: 'La thématique est obligatoire' })
  thematic: number;

  @IsNotEmpty({ message: "L'appel est obligatoire" })
  event: number;

  @IsNotEmpty({ message: 'Les challenges sont obligatoires' })
  challenges: number[];
}
