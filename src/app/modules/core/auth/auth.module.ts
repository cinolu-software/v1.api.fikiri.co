import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { Session } from './session';
import { GoogleStrategy } from './strategies/google.strategy';
import { UsersModule } from '../users/users.module';
import { EmailModule } from '../../utilities/email/email.module';

@Module({
  imports: [PassportModule.register({ session: true }), UsersModule, EmailModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, Session, GoogleStrategy]
})
export class AuthModule {}
