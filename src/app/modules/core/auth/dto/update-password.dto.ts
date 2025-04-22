import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { Match } from '../../../../common/decorators/match.decorator';

export class UpdatePasswordDto {
  @IsOptional()
  old_password: string;

  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères'
  })
  password: string;

  @IsNotEmpty({ message: 'La confirmation du mot de passe est recquise' })
  @Match('password', { message: 'Les mots de passe ne correspondent pas' })
  password_confirm: string;
}
