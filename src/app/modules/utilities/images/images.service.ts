import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { promisify } from 'util';
import * as fs from 'node:fs';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  unlinkAsync = promisify(fs.unlink);

  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>
  ) {}

  async create(dto: CreateImageDto): Promise<{ data: Image }> {
    try {
      const data: Image = await this.imageRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException("Impossible d'uploader l'image");
    }
  }

  async findOne(id: number): Promise<{ data: Image }> {
    try {
      const data: Image = await this.imageRepository.findOneByOrFail({ id });
      return { data };
    } catch {
      throw new NotFoundException('Image introuvable');
    }
  }

  async update(id: number, dto: UpdateImageDto) {
    try {
      const { data: image } = await this.findOne(id);
      const updatedImage: Image & UpdateImageDto = Object.assign(image, dto);
      const data: Image = await this.imageRepository.save(updatedImage);
      return { data };
    } catch {
      throw new BadRequestException("Une erreur est survenue lors de la mise à jour de l'image");
    }
  }

  async existsOnDisk(image_link: string): Promise<boolean> {
    return fs.existsSync(`./uploads/${image_link}`);
  }

  async remove(id: number): Promise<void> {
    const { data: image } = await this.findOne(id);
    await this.imageRepository.delete(id);
    await this.unlinkAsync(`./uploads/solutions/${image.image_link}`);
  }
}
