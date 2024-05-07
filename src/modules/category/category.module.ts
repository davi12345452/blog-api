import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ErrorsCategoryLogs } from './utils/errors-category-logs';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, ErrorsCategoryLogs],
})
export class CategoryModule {}
