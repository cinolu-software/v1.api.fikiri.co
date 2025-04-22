import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>
  ) {}

  async create(dto: CreateStatusDto): Promise<{ data: Status }> {
    try {
      const data: Status = await this.statusRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création du status');
    }
  }

  async findAll(): Promise<{ data: Status[] }> {
    const data: Status[] = await this.statusRepository.find({
      order: { updated_at: 'DESC' }
    });
    return { data };
  }

  async findOne(id: number): Promise<{ data: Status }> {
    try {
      const data: Status = await this.statusRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du status');
    }
  }

  async update(id: number, dto: UpdateStatusDto): Promise<{ data: Status }> {
    try {
      const { data: status } = await this.findOne(id);
      const updatedStatus: Status & UpdateStatusDto = Object.assign(status, dto);
      const data: Status = await this.statusRepository.save(updatedStatus);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du status');
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.statusRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression du status');
    }
  }
}
