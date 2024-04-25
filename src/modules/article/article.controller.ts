import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req: Request, @Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(req, createArticleDto);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(req, id, updateArticleDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.articleService.remove(req, id);
  }
}
