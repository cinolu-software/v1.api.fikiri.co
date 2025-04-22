import { IsNotEmpty } from 'class-validator';

export class CreateChallengeDto {
  @IsNotEmpty({ message: 'Le nom ne est requis' })
  name: string;

  @IsNotEmpty({ message: 'Le champ thématique est requis' })
  thematics: number[];
}
