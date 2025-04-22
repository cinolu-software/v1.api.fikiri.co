import { IsNotEmpty, MinLength } from 'class-validator';
import { Match } from '../../../../common/decorators/match.decorator';

export class ResetPasswordDto {
  @IsNotEmpty({
    message: 'Le code ne peut pas être vide'
  })
  token: string;

  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères'
  })
  password: string;

  @Match('password', { message: 'Les mots de passe ne correspondent pas' })
  password_confirm: string;
}
