import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async create(dto: CreateRoleDto): Promise<{ data: Role }> {
    try {
      const data: Role = await this.roleRepository.save(dto);
      return { data };
    } catch {
      throw new ConflictException('Erreur lors de la création du rôle');
    }
  }

  async findAll(): Promise<{ data: Role[] }> {
    const data: Role[] = await this.roleRepository.find({
      order: { updated_at: 'DESC' }
    });
    return { data };
  }

  async findOne(id: number): Promise<{ data: Role }> {
    try {
      const data: Role = await this.roleRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la récupération du rôle');
    }
  }

  async update(id: number, dto: UpdateRoleDto): Promise<{ data: Role }> {
    try {
      const { data: role } = await this.findOne(id);
      const updatedRole: Role & UpdateRoleDto = Object.assign(role, dto);
      const data: Role = await this.roleRepository.save(updatedRole);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour du rôle');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.roleRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression du rôle');
    }
  }
}
