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
      throw new BadRequestException(this.logsError.CATEGORY_ERROR_01);
    }
  }

  async findAll(limit?: number) {
    return await this.prisma.article.findMany({ take: limit });
  }

  async findOneById(id: string) {
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(this.logsError.CATEGORY_ERROR_02);
    }
    return article;
  }

  async findOneBySlug(slug: string) {
    const article = await this.prisma.article.findUnique({ where: { slug } });
    if (!article) {
      throw new NotFoundException(this.logsError.CATEGORY_ERROR_03);
    }
    return article;
  }

  async update(req: Request, id: string, data: UpdateArticleDto) {
    const userFromReq = req['user'];
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(this.logsError.CATEGORY_ERROR_04);
    }
    if (article.id != userFromReq.id && userFromReq.type != 'ADMIN') {
      throw new ForbiddenException(this.logsError.CATEGORY_ERROR_05);
    }
    try {
      return await this.prisma.article.update({ where: { id }, data });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(this.logsError.CATEGORY_ERROR_06);
    }
  }

  async remove(req: Request, id: string) {
    const userFromReq = req['user'];
    const article = await this.prisma.article.findUnique({ where: { id } });
    if (!article) {
      throw new NotFoundException(this.logsError.CATEGORY_ERROR_07);
    }
    if (article.id != userFromReq.id && userFromReq.type != 'ADMIN') {
      throw new ForbiddenException(this.logsError.CATEGORY_ERROR_08);
    }
    try {
      return await this.prisma.article.delete({ where: { id } });
    } catch (error) {
      console.error(error);
      throw new BadRequestException(this.logsError.CATEGORY_ERROR_09);
    }
  }

  async findAllByCategory(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(this.logsError.CATEGORY_ERROR_10);
    }
    return await this.prisma.article.findMany({ where: { id: category.id } });
  }
}
