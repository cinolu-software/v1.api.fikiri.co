import { BadRequestException, Injectable } from '@nestjs/common';
import { Feedback } from '../feedbacks/entities/feedback.entity';
import { Solution } from '../solutions/entities/solution.entity';
import { SolutionsService } from '../solutions/solutions.service';
import { CreateFeedbackDto } from '../feedbacks/dto/create-feedback.dto';
import { UpdateFeedbackDto } from '../feedbacks/dto/update-feedback.dto';
import { FeedbacksService } from '../feedbacks/feedbacks.service';

@Injectable()
export class SolutionFeedbacksService {
  constructor(
    private readonly solutionsService: SolutionsService,
    private readonly feedbacksService: FeedbacksService
  ) {}

  async addFeedback(id: number, dto: CreateFeedbackDto): Promise<{ data: Solution }> {
    try {
      const { data: result } = await this.solutionsService.findOne(id);
      const { solution } = result;
      const { data: feedBack } = await this.feedbacksService.create(dto);
      solution.feedbacks = [...solution.feedbacks, feedBack];
      const { data } = await this.solutionsService.saveSolution(solution);
      return { data };
    } catch {
      throw new BadRequestException("Erreur lors de l'ajout du feedback à la solution");
    }
  }

  async updateFeedback(id: number, dto: UpdateFeedbackDto): Promise<{ data: Feedback }> {
    try {
      await this.feedbacksService.findOne(id);
      const { data } = await this.feedbacksService.update(id, dto);
      return { data };
    } catch {
      await this.feedbacksService.findOne(id);
      const { data } = await this.feedbacksService.update(id, dto);
      return { data };
    }
  }

  async deleteFeedback(id: number): Promise<void> {
    try {
      await this.feedbacksService.findOne(id);
      await this.feedbacksService.remove(id);
    } catch {
      throw new BadRequestException('Erreur lors de la suppression du feedback à la solution');
    }
  }
}
