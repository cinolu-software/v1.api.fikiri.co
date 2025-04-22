import { IsNotEmpty } from 'class-validator';

export class CreatePoleDto {
  @IsNotEmpty({ message: 'Le nom est requis' })
  name: string;
}
