import { PartialType } from '@nestjs/mapped-types';
import { CreatePoleDto } from './create-pole.dto';

export class UpdatePoleDto extends PartialType(CreatePoleDto) {}
