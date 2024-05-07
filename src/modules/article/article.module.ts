import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ErrorsArticleLogs } from './utils/errors-article-logs';

@Module({
  imports: [PrismaModule],
  controllers: [ArticleController],
  providers: [ArticleService, ErrorsArticleLogs],
})
export class ArticleModule {}
