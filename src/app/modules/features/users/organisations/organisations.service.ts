import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { Repository } from 'typeorm';
import { Organisation } from './entities/organisation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrganisationsService {
  constructor(
    @InjectRepository(Organisation)
    private readonly organisationRepository: Repository<Organisation>
  ) {}

  async create(dto: CreateOrganisationDto): Promise<{ data: Organisation }> {
    try {
      const data: Organisation = await this.organisationRepository.save(dto);
      return { data };
    } catch {
      throw new ConflictException("Impossible de créer l'organisation");
    }
  }

  async findAll(): Promise<{ data: Organisation[] }> {
    const data: Organisation[] = await this.organisationRepository.find();
    return { data };
  }

  async findOne(id: number): Promise<{ data: Organisation }> {
    try {
      const data: Organisation = await this.organisationRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new NotFoundException("Impossible de récupérer l'organisation");
    }
  }

  async update(id: number, dto: UpdateOrganisationDto): Promise<{ data: Organisation }> {
    try {
      const { data: organisation } = await this.findOne(id);
      const updatedOrganisation: Organisation & UpdateOrganisationDto = Object.assign(organisation, dto);
      const data: Organisation = await this.organisationRepository.save(updatedOrganisation);
      return { data };
    } catch {
      throw new ConflictException("Impossible de mettre à jour l'organisation");
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.organisationRepository.delete(id);
    } catch {
      throw new ConflictException("Impossible de supprimer l'organisation");
    }
  }
}
