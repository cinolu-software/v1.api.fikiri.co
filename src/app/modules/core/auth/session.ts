import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

@Injectable()
export class Session extends PassportSerializer {
  serializeUser(user: User, done: (err: Error, user: User) => void): void {
    done(null, user);
  }

  deserializeUser(payload: string, done: (err: Error, payload: string) => void) {
    done(null, payload);
  }
}
