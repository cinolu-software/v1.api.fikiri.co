import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { BadRequestException, Injectable, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CurrentUser } from '../../../common/decorators/user.decorator';
import { SignupDto } from './dto/register.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { EmailService } from '../../utilities/email/email.service';
import { randomPassword } from '../../../common/utils/helpers/random-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService
  ) {}

  async validateUser(email: string, password: string): Promise<{ data: User }> {
    const { data: user } = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException('Les identifiants saisis sont invalides');
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) throw new BadRequestException('Les identifiants saisis sont invalides');
    return { data: user };
  }

  async loginGoogle(@Res() res: Response): Promise<void> {
    return res.redirect(process.env.FRONTEND_URI);
  }

  async login(@Req() req: Request): Promise<{ data: Express.User }> {
    const data: Express.User = req.user;
    return { data };
  }

  async logout(@Req() request: Request): Promise<void> {
    request.session.destroy(() => {});
  }

  async profile(@CurrentUser() user: User): Promise<{ data: User }> {
    const { data } = await this.usersService.findOne(user.id);
    return { data };
  }

  async updateProfile(@CurrentUser() currentUser: User, dto: UpdateProfileDto): Promise<{ data: User }> {
    return await this.usersService.updateProfile(currentUser, dto);
  }

  async register(registerDto: SignupDto): Promise<{ data: User }> {
    const { data } = await this.usersService.register(registerDto);
    return { data };
  }

  async updatePassword(@CurrentUser() user: User, dto: UpdatePasswordDto): Promise<{ data: User }> {
    const { password } = dto;
    if (user.password) {
      const isMatch: boolean = await bcrypt.compare(dto.old_password, user.password);
      if (!isMatch) throw new BadRequestException("L'ancien mot de passe est incorrect");
    }
    try {
      await this.usersService.updatePassword(user.id, password);
      return { data: user };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du mot de passe');
    }
  }

  async resetPasswordRequest(dto: ResetPasswordRequestDto): Promise<{ data: User }> {
    const { email } = dto;
    const { data } = await this.usersService.findByEmail(email);
    if (!data) throw new BadRequestException('Aucun utilisateur trouvé avec cet email');
    const token = randomPassword();
    await this.usersService.update(data.id, { token });
    await this.emailService.sendResetPasswordEmail(data, token);
    return { data };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ data: User }> {
    const { token, password } = resetPasswordDto;
    const { data } = await this.usersService.findByResetToken(token);
    try {
      await this.usersService.updatePassword(data.id, password);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la réinitialisation du mot de passe');
    }
  }
}
