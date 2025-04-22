import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFeedbackDto {
  @IsNotEmpty({ message: 'Les impressions sont obligatoires' })
  quotations: number[];

  @IsOptional()
  adminComment: string;

  @IsOptional()
  userComment: string;

  @IsNotEmpty({
    message: "L'utilisateur qui ajoute le feedback est obligatoire"
  })
  user: string;
}
