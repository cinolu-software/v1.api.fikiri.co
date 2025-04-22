import { IsNotEmpty } from 'class-validator';

export class CreateLableDto {
  @IsNotEmpty({
    message: 'Le nom est obligatoire'
  })
  mention: string;

  @IsNotEmpty({ message: 'La quotation est obligatoire' })
  average: number;
}
