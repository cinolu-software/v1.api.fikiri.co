import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(dto: CreateCategoryDto): Promise<{ data: Category }> {
    try {
      const data: Category = await this.categoryRepository.save(dto);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la création de la catégorie');
    }
  }

  async findAll(): Promise<{ data: Category[] }> {
    const data: Category[] = await this.categoryRepository.find();
    return { data };
  }

  async findOne(id: number): Promise<{ data: Category }> {
    try {
      const data: Category = await this.categoryRepository.findOneOrFail({
        where: { id }
      });
      return { data };
    } catch {
      throw new BadRequestException('Impossible de récupérer la catégorie');
    }
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<{ data: Category }> {
    try {
      const { data: category } = await this.findOne(id);
      const updatedCategory = Object.assign(category, dto);
      const data: Category = await this.categoryRepository.save(updatedCategory);
      return { data };
    } catch {
      throw new BadRequestException('Erreur lors de la mise à jour de la catégorie');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.findOne(id);
      await this.categoryRepository.delete(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression de la catégorie');
    }
  }
}
