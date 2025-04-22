import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty({ message: 'Le nom ne peut pas être vide' })
  name: string;

  @IsNotEmpty({ message: 'La description ne peut pas être vide' })
  description: string;

  @IsNotEmpty({ message: 'La date de début ne peut pas être vide' })
  started_at: Date;

  @IsNotEmpty({ message: 'La date de fin ne peut pas être vide' })
  ended_at: Date;
}
