import { IsEmail } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsEmail({}, { message: "L'adresse email saisi est invalide" })
  email: string;
}
