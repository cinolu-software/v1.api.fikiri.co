import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { extname } from 'path';

export function validateFile(): PipeTransform {
  return new FileValidationPipe();
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly allowedExtensions = ['.png', '.jpeg', '.jpg'];

  transform(value: Express.Multer.File): Express.Multer.File {
    const extension = extname(value.originalname);
    const oneMb = 1_000_000;
    if (value.size > oneMb) {
      throw new BadRequestException(`Le fichier est trop lourd. La taille maximale autorisée est de 1MB`);
    }
    if (!this.allowedExtensions.includes(extension)) {
      throw new BadRequestException(
        `Le fichier de type ${extension} n'est pas supporté. Les types supportés sont ${this.allowedExtensions.join(', ')}`
      );
    }
    return value;
  }
}
