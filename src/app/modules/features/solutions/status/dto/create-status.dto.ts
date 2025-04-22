import { IsNotEmpty } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  name: string;
}
