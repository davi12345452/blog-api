import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [AuthModule],
})
export class CategoryModule {}
