import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ErrorsArticleLogs } from './utils/errors-article-logs';
import { Request } from 'express';
import { createSlug } from '../category/utils/create-slug';

@Injectable()
export class ArticleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logsError: ErrorsArticleLogs,
  ) {}

  async create(req: Request, data: CreateArticleDto) {
    const userFromReq = req['user'];
    return await this.prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        slug: createSlug(data.title),
        user_id: userFromReq.id,
        category_id: data.category_id,
      },
    });
  }

  async findAll() {
    return await this.prisma.article.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.article.findUnique({ where: { id } });
  }

  async update(req: Request, id: string, data: UpdateArticleDto) {
    return await this.prisma.article.update({ where: { id }, data });
  }

  async remove(req: Request, id: string) {
    return await this.prisma.article.delete({ where: { id } });
  }
}
