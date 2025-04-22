import { Module } from '@nestjs/common';
import { SolutionsFeedbacksController } from './solution-feebacks.controller';
import { SolutionFeedbacksService } from './solution-feebacks.service';
import { SolutionsModule } from '../solutions/solutions.module';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';

@Module({
  imports: [FeedbacksModule, SolutionsModule],
  controllers: [SolutionsFeedbacksController],
  providers: [SolutionFeedbacksService]
})
export class SolutionFeedbacksModule {}
