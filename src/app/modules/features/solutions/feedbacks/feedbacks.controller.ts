import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { Feedback } from './entities/feedback.entity';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { RoleEnum } from '../../../core/auth/enums/role.enum';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Get('')
  findAll(): Promise<{ data: Feedback[] }> {
    return this.feedbacksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<{ data: Feedback }> {
    return this.feedbacksService.findOne(+id);
  }

  @Patch(':id')
  @Roles([RoleEnum.Admin])
  update(@Param('id') id: string, dto: any): Promise<{ data: Feedback }> {
    return this.feedbacksService.update(+id, dto);
  }

  @Delete(':id')
  @Roles([RoleEnum.Admin])
  remove(@Param('id') id: string): Promise<void> {
    return this.feedbacksService.remove(+id);
  }
}
