import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { UpdateChallengeDto } from './dto/update-challenge.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>
  ) {}

  async create(dto: CreateChallengeDto): Promise<{ data: Challenge }> {
    try {
      const data: Challenge = await this.challengeRepository.save({
        ...dto,
        thematics: dto.thematics.map((id: number) => ({ id }))
      });
      return { data };
    } catch {
      throw new BadRequestException('Impossible de créer le défi');
    }
  }

  async findAll(): Promise<{ data: Challenge[] }> {
    const data: Challenge[] = await this.challengeRepository.find();
    return { data };
  }

  async findByThematic(thematicId: number) {
    try {
      const data: Challenge[] = await this.challengeRepository.find({
        where: { thematics: { id: thematicId } }
      });
      return { data };
    } catch {
      throw new BadRequestException('Impossible de trouver les défis pour cette thématique');
    }
  }

  async findOne(id: number): Promise<{ data: Challenge }> {
    try {
      const data: Challenge = await this.challengeRepository.findOne({
        where: { id }
      });
      return { data };
    } catch {
      throw new NotFoundException('Impossible de récupérer le défi');
    }
  }

  async update(id: number, dto: UpdateChallengeDto): Promise<{ data: Challenge }> {
    try {
      const { data: challenge } = await this.findOne(id);
      const updatedChallenge: Challenge & UpdateChallengeDto = Object.assign(challenge, dto);
      const data: Challenge = await this.challengeRepository.save(updatedChallenge);
      return { data };
    } catch {
      throw new BadRequestException('Impossible de mettre à jour le défi');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.challengeRepository.delete(id);
    } catch {
      throw new BadRequestException('Impossible de supprimer le défi');
    }
  }
}
