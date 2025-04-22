import { PartialType } from '@nestjs/mapped-types';
import CreateUserDto from './create-user.dto';
import { Optional } from '@nestjs/common';

export class UpdateUserDto extends PartialType<CreateUserDto>(CreateUserDto) {
  @Optional()
  token: string;
}
