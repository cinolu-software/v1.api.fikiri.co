import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateThematicDto } from './dto/create-thematic.dto';
import { UpdateThematicDto } from './dto/update-thematic.dto';
import { Repository } from 'typeorm';
import { Thematic } from './entities/thematic.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ThematicsService {
  constructor(
    @InjectRepository(Thematic)
    private readonly thematicRepository: Repository<Thematic>
  ) {}

  async create(dto: CreateThematicDto): Promise<{ data: Thematic }> {
    try {
      const data: Thematic = await this.thematicRepository.save(dto);
      return { data };
    } catch {
      throw new NotFoundException('Erreur lors de la création de la thématique');
    }
  }

  async findAll(): Promise<{ data: Thematic[] }> {
    const data: Thematic[] = await this.thematicRepository.find({
      order: { updated_at: 'DESC' }
    });
    return { data };
  }

  async findByEvent(eventId: number): Promise<{ data: Thematic[] }> {
    const data: Thematic[] = await this.thematicRepository
      .createQueryBuilder('t')
      .select(['t.id', 't.name'])
      .leftJoin('t.events', 'e')
      .where('e.id = :eventId', { eventId })
      .getMany();
    return { data };
  }

  async findOne(id: number): Promise<{ data: Thematic }> {
    try {
      const data: Thematic = await this.thematicRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération de la thématique');
    }
  }

  async update(id: number, dto: UpdateThematicDto): Promise<{ data: Thematic }> {
    try {
      const { data: thematic } = await this.findOne(id);
      const updatedThematic: Thematic & UpdateThematicDto = Object.assign(thematic, dto);
      const data: Thematic = await this.thematicRepository.save(updatedThematic);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la modification de la thématique');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.thematicRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression de la thématique');
    }
  }
}
