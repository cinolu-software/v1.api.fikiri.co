import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/core/auth/auth.module';
import { UsersModule } from './modules/core/users/users.module';
import { SolutionsModule } from './modules/features/solutions/solutions/solutions.module';
import { ThematicsModule } from './modules/features/events/thematics/thematics.module';
import { APP_GUARD } from '@nestjs/core';
import { EventsModule } from './modules/features/events/events/events.module';
import { FeedbacksModule } from './modules/features/solutions/feedbacks/feedbacks.module';
import { OrganisationsModule } from './modules/features/users/organisations/organisations.module';
import { PolesModule } from './modules/features/users/poles/poles.module';
import { QuotationsModule } from './modules/features/solutions/quotations/quotations.module';
import { SolutionFeedbacksModule } from './modules/features/solutions/solution-feedbacks/solution-feedbacks.module';
import { StatusModule } from './modules/features/solutions/status/status.module';
import { DatabaseModule } from './modules/core/database/database.module';
import { EmailModule } from './modules/utilities/email/email.module';
import { SearchModule } from './modules/utilities/search/search.module';
import { RolesModule } from './modules/core/roles/roles.module';
import { RolesGuard } from './modules/core/auth/guards/roles.guard';
import { AuthGuard } from './modules/core/auth/guards/auth.guard';
import { CategoriesModule } from './modules/features/events/categories/categories.module';
import { ImagesModule } from './modules/utilities/images/images.module';
import { DashboardModule } from './modules/features/dashboard/dashboard.module';
import { ChallengesModule } from './modules/features/events/challenges/challenges.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..'),
      renderPath: '/uploads'
    }),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    UsersModule,
    RolesModule,
    SolutionsModule,
    ThematicsModule,
    EventsModule,
    ChallengesModule,
    StatusModule,
    QuotationsModule,
    FeedbacksModule,
    PolesModule,
    OrganisationsModule,
    DashboardModule,
    EmailModule,
    ImagesModule,
    DatabaseModule,
    SolutionFeedbacksModule,
    CategoriesModule,
    SearchModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
