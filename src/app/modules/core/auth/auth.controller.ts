import { Body, Controller, Get, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Public } from '../../../common/decorators/public.decorator';
import { CurrentUser } from '../../../common/decorators/user.decorator';
import { SignupDto } from './dto/register.dto';
import UpdateProfileDto from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { User } from '../users/entities/user.entity';
import { LocalGuard } from './guards/local.guard';
import { GoogleGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('logout')
  logout(@Req() request: Request): Promise<void> {
    return this.authService.logout(request);
  }

  @Get('profile')
  profile(@CurrentUser() user: User): Promise<{ data: User }> {
    return this.authService.profile(user);
  }

  @Patch('profile')
  updateProfile(@CurrentUser() currentUser: User, @Body() data: UpdateProfileDto): Promise<{ data: User }> {
    return this.authService.updateProfile(currentUser, data);
  }

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  login(@Req() req: Request): Promise<{ data: Express.User }> {
    return this.authService.login(req);
  }

  @Public()
  @UseGuards(GoogleGuard)
  @Get('login')
  loginGoogle(): void {}

  @Public()
  @Post('register')
  register(@Body() data: SignupDto): Promise<{ data: User }> {
    return this.authService.register(data);
  }

  @Public()
  @UseGuards(GoogleGuard)
  @Get('google/redirect')
  googleAuthRedirect(@Res() res: any): Promise<void> {
    return this.authService.loginGoogle(res);
  }

  @Patch('update-password')
  updatePassword(@CurrentUser() user: User, @Body() dto: UpdatePasswordDto): Promise<{ data: User }> {
    return this.authService.updatePassword(user, dto);
  }

  @Public()
  @Post('reset-password-request')
  resetPasswordRequest(@Body() dto: ResetPasswordRequestDto): Promise<{ data: User }> {
    return this.authService.resetPasswordRequest(dto);
  }

  @Public()
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto): Promise<{ data: User }> {
    return this.authService.resetPassword(dto);
  }
}
