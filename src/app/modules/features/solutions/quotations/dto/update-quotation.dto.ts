import { PartialType } from '@nestjs/mapped-types';
import { CreateLableDto } from './create-quotation.dto';

export class UpdateLableDto extends PartialType(CreateLableDto) {}
