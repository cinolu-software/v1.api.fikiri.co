import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { CreateWithGoogleDto } from '../../users/dto/create-with-google.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly userService: UsersService,
    readonly configService: ConfigService
  ) {
    super({
      clientID: configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get('GOOGLE_SECRET'),
      callbackURL: configService.get('GOOGLE_REDIRECT_URI'),
      scope: ['email', 'profile']
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any, done: VerifyCallback) {
    const { emails, name, photos } = profile;
    const userDto: CreateWithGoogleDto = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      google_image: photos[0].value
    };
    const { data: user } = await this.userService.findOrCreate(userDto);
    done(null, user);
  }
}
