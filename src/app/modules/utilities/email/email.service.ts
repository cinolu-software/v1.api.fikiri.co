import { BadRequestException, Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/app/modules/core/users/entities/user.entity';

@Injectable()
export class EmailService {
  constructor(private readonly mailerSerive: MailerService) {}

  async sendResetPasswordEmail(user: User, token: string): Promise<void> {
    const mail: ISendMailOptions = {
      to: user.email,
      subject: 'Réinitialisation du mot de passe',
      template: './reset-password',
      context: { user, token }
    };
    try {
      await this.mailerSerive.sendMail(mail);
    } catch {
      throw new BadRequestException("Une erreur est survenenue lors de l'envoie d'email");
    }
  }

  async sendRegistrationEmail(user: User, password: string): Promise<void> {
    const mail: ISendMailOptions = {
      to: user.email,
      subject: 'Bienvenue sur fikiri',
      template: './registration',
      context: { user, password }
    };
    try {
      await this.mailerSerive.sendMail(mail);
    } catch {
      throw new BadRequestException("Une erreur est survenenue lors de l'envoie d'email");
    }
  }
}
