import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePoleDto } from './dto/create-pole.dto';
import { UpdatePoleDto } from './dto/update-pole.dto';
import { Repository } from 'typeorm';
import { Pole } from './entities/pole.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PolesService {
  constructor(
    @InjectRepository(Pole)
    private readonly poleRepository: Repository<Pole>
  ) {}

  async create(dto: CreatePoleDto): Promise<{ data: Pole }> {
    try {
      const data: Pole = await this.poleRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Impossible de créer le pôle');
    }
  }

  async findAll(): Promise<{ data: Pole[] }> {
    const data: Pole[] = await this.poleRepository.find();
    return { data };
  }

  async findOne(id: number): Promise<{ data: Pole }> {
    try {
      const data: Pole = await this.poleRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Impossible de récupérer le pôle');
    }
  }

  async update(id: number, dto: UpdatePoleDto): Promise<{ data: Pole }> {
    try {
      const { data: pole } = await this.findOne(id);
      const updatedPole: Pole & UpdatePoleDto = Object.assign(pole, dto);
      const data: Pole = await this.poleRepository.save(updatedPole);
      return { data };
    } catch {
      throw new BadRequestException('Impossible de mettre à jour le pôle');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.poleRepository.delete(id);
    } catch {
      throw new BadRequestException('Impossible de supprimer le pôle');
    }
  }
}
