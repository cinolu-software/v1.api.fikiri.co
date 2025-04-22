import { CreateImageDto } from './create-image.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateImageDto extends PartialType(CreateImageDto) {}
