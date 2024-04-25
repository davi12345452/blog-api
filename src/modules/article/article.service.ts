import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      return await this.prisma.article.create({
        data: {
          title: data.title,
          content: data.content,
          slug: createSlug(data.title),
          user_id: userFromReq.id,
          category_id: data.category_id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async findAll() {
    return await this.prisma.article.findMany();
  }

  async findOneById(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  async findOneBySlug(slug: string) {
    const article = await this.prisma.article.findUnique({ where: { slug } });
    if (!article) {
      throw new NotFoundException();
    }
    return article;
  }

  async update(req: Request, id: string, data: UpdateArticleDto) {
    const userFromReq = req['user'];
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException();
    }
    if (article.id != userFromReq.id && userFromReq.type != 'ADMIN') {
      throw new ForbiddenException();
    }
    try {
      return await this.prisma.article.update({ where: { id }, data });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }

  async remove(req: Request, id: string) {
    const userFromReq = req['user'];
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException();
    }
    if (article.id != userFromReq.id && userFromReq.type != 'ADMIN') {
      throw new ForbiddenException();
    }
    try {
      return await this.prisma.article.update({ where: { id }, data });
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
}
