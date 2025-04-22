import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { User } from '../../core/users/entities/user.entity';
import { Solution } from '../solutions/solutions/entities/solution.entity';

@Injectable()
export class DashboardService {
  constructor(private readonly entityManager: EntityManager) {}

  async getCounts(): Promise<{
    data: { totalUsers: number; totalSolutions: number };
  }> {
    const totalUsers: number = await this.entityManager.getRepository(User).count();
    const totalSolutions: number = await this.entityManager.getRepository(Solution).count();
    return {
      data: {
        totalUsers,
        totalSolutions
      }
    };
  }

  async getUsers(): Promise<{ data: User[] }> {
    const data: User[] = await this.entityManager.getRepository(User).find({
      select: ['id', 'created_at', 'updated_at']
    });
    return { data };
  }

  async countByStatus(): Promise<{
    data: { status: string; count: number }[];
  }> {
    const countByStatus: { status: string; count: number }[] = await this.entityManager
      .getRepository(Solution)
      .createQueryBuilder('solution')
      .select('status.name as status')
      .addSelect('COUNT(solution.id) as count')
      .innerJoin('solution.status', 'status')
      .groupBy('status.name')
      .getRawMany();
    return { data: countByStatus };
  }

  async getSolutions(): Promise<{ data: Solution[] }> {
    const data: Solution[] = await this.entityManager.getRepository(Solution).find({
      select: ['id', 'created_at', 'updated_at'],
      relations: ['status']
    });
    return { data };
  }

  async getSolutionsAndThematics(): Promise<{ data: Solution[] }> {
    const data: Solution[] = await this.entityManager.getRepository(Solution).find({
      select: ['id', 'created_at', 'updated_at'],
      relations: ['thematic']
    });
    return { data };
  }
}
