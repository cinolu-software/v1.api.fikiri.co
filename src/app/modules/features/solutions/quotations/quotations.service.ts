import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLableDto } from './dto/create-quotation.dto';
import { UpdateLableDto } from './dto/update-quotation.dto';
import { Repository } from 'typeorm';
import { Quotation } from './entities/quotation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuotationsService {
  constructor(
    @InjectRepository(Quotation)
    private readonly quotationRepository: Repository<Quotation>
  ) {}

  async create(dto: CreateLableDto): Promise<{ data: Quotation }> {
    try {
      const data: Quotation = await this.quotationRepository.save(dto);
      return { data };
    } catch {
      throw new ConflictException('Erreur lors de la création de la quotation');
    }
  }

  async findAll(): Promise<{ data: Quotation[] }> {
    const data: Quotation[] = await this.quotationRepository.find();

    return { data };
  }

  async findOne(id: number): Promise<{ data: Quotation }> {
    try {
      const data: Quotation = await this.quotationRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new NotFoundException('Erreur lors de la récupération de la quotation');
    }
  }

  async update(id: number, dto: UpdateLableDto): Promise<{ data: Quotation }> {
    try {
      const { data: quotation } = await this.findOne(id);
      const updatedQuotation: Quotation & UpdateLableDto = Object.assign(quotation, dto);
      const data: Quotation = await this.quotationRepository.save(updatedQuotation);
      return { data };
    } catch {
      throw new ConflictException('Erreur lors de la mise à jour de la quotation');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.quotationRepository.delete(id);
    } catch {
      throw new ConflictException('Erreur lors de la suppression de la quotation');
    }
  }
}
