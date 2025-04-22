import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateCallDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ImagesService } from '../../../utilities/images/images.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    private readonly imageService: ImagesService
  ) {}

  async create(dto: CreateEventDto): Promise<{ data: Event }> {
    try {
      const data: Event = await this.eventRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException("Impossible de créer l'appel à solution");
    }
  }

  async findAll(): Promise<{ data: Event[] }> {
    const data: Event[] = await this.eventRepository.find({
      relations: ['images']
    });
    return { data };
  }

  async findRecent(): Promise<{
    data: { call: Event; prev: number; next: number };
  }> {
    const call: Event = await this.eventRepository.createQueryBuilder('c').orderBy('c.created_at', 'DESC').getOne();
    const { prev, next } = await this.findNeighbours(call.id);
    return {
      data: { call, prev, next }
    };
  }

  async findOne(id: number): Promise<{ data: { event: Event; prev: number; next: number } }> {
    try {
      const event: Event = await this.eventRepository.findOneOrFail({
        where: { id },
        relations: ['images']
      });
      const { prev, next } = await this.findNeighbours(id);
      return {
        data: { event, prev, next }
      };
    } catch {
      throw new NotFoundException("Impossible de récupérer l'appel à solution");
    }
  }

  async findNeighbours(id: number): Promise<{ prev: number; next: number }> {
    const data: Event[] = await this.eventRepository.createQueryBuilder('c').select('c.id').getMany();
    const index: number = data.findIndex((call) => call.id === id);
    const prev: number = data[index - 1]?.id ?? null;
    const next: number = data[index + 1]?.id ?? null;
    return { prev, next };
  }

  async update(id: number, dto: UpdateCallDto): Promise<{ data: Event }> {
    try {
      const { data: result } = await this.findOne(id);
      const { event } = result;
      const updatedCall: Event & UpdateCallDto = Object.assign(event, dto);
      const data: Event = await this.eventRepository.save(updatedCall);
      return { data };
    } catch {
      throw new BadRequestException("Impossible de mettre à jour l'appel à solution");
    }
  }

  async uploadImage(id: number, files: Express.Multer.File[]): Promise<void> {
    try {
      const { data: result } = await this.findOne(id);
      const { event } = result;
      const images = await Promise.all(
        files.map(async (file) => {
          const { data } = await this.imageService.create({
            image_link: file.filename
          });
          return data;
        })
      );
      event.images = [...event.images, ...images];
      await this.eventRepository.save(event);
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout de l'image à l'événement");
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.eventRepository.delete(id);
    } catch {
      throw new BadRequestException("Impossible de supprimer l'appel à solution");
    }
  }
}
