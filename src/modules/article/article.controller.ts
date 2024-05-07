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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/swagger/helpers/BadRequestError';
import { NotFoundRequestSwagger } from 'src/swagger/helpers/NotFoundRequestErrro';
import { ForbiddenRequestSwagger } from 'src/swagger/helpers/ForbiddenRequestError';
import { ArticleEntity } from 'src/swagger/entities/article-entity';

@ApiTags('Articles')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // Endpoint que permite criar um artigo no sistema: ABERTO NO SWAGGER
  @Post()
  @ApiOperation({
    summary: 'Enables the creation of an article',
    description:
      'This endpoint allows the creation of an article in the system',
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
  })
  @ApiOkResponse({
    description: 'Article created successfully',
    type: ArticleEntity,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req: Request, @Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(req, createArticleDto);
  }

  // Endpoint que permite achar todos os artigos do sistema: ABERTO NO SWAGGER
  @Get()
  @ApiOperation({
    summary: 'Enables to find all articles',
    description: 'This endpoint allows to user find all articles in the system',
  })
  @ApiOkResponse({
    description: 'Articles find successfully',
    type: ArticleEntity,
    isArray: true,
  })
  findAll() {
    return this.articleService.findAll();
  }

  // Endpoint que permite achar um artigo por seu ID no sistema: ABERTO NO SWAGGER
  @Get(':id')
  @ApiOperation({
    summary: 'Enables find specific article',
    description:
      'This endpoint allows to user find specific article by ID in the system',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID of the article to find',
    type: String,
  })
  @ApiNotFoundResponse({
    type: NotFoundRequestSwagger,
  })
  @ApiOkResponse({
    description: 'Article find successfully',
    type: ArticleEntity,
  })
  findOne(@Param('id') id: string) {
    return this.articleService.findOneById(id);
  }

  // Endpoint que permite achar um artigo por seu Slug no sistema: ABERTO NO SWAGGER
  @Get('slug/:slug')
  @ApiOperation({
    summary: 'Enables find specific article',
    description:
      'This endpoint allows to user find specific article by SLUG in the system',
  })
  @ApiParam({
    name: 'slug',
    required: true,
    description: 'Slug of the article to find',
    type: String,
  })
  @ApiNotFoundResponse({
    type: NotFoundRequestSwagger,
  })
  @ApiOkResponse({
    description: 'Article find successfully',
    type: ArticleEntity,
  })
  findOneSlug(@Param('slug') slug: string) {
    return this.articleService.findOneBySlug(slug);
  }

  // Endpoint que permite editar um artigo por seu ID no sistema: ABERTO NO SWAGGER
  @Put(':id')
  @ApiOperation({
    summary: 'Enables update article',
    description:
      'This endpoint allows to user update article information in the system',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID of the article to update',
    type: String,
  })
  @ApiNotFoundResponse({
    type: NotFoundRequestSwagger,
  })
  @ApiForbiddenResponse({
    type: ForbiddenRequestSwagger,
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
  })
  @ApiOkResponse({
    description: 'Article update successfully',
    type: ArticleEntity,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articleService.update(req, id, updateArticleDto);
  }

  // Endpoint que permite deletar um artigo por seu ID no sistema: ABERTO NO SWAGGER
  @Delete(':id')
  @ApiOperation({
    summary: 'Enables delete article',
    description: 'This endpoint allows to user delete article in system',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID of the article to delete',
    type: String,
  })
  @ApiNotFoundResponse({
    type: NotFoundRequestSwagger,
  })
  @ApiForbiddenResponse({
    type: ForbiddenRequestSwagger,
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
  })
  @ApiOkResponse({
    description: 'Article delete successfully',
    type: ArticleEntity,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.articleService.remove(req, id);
  }

  // Endpoint que permite achar todos os artigos de uma determinada categoria no sistema: ABERTO NO SWAGGER
  @Get('category/:id')
  @ApiOperation({
    summary: 'Enables to find all category articles',
    description:
      'This endpoint allows to user find all articles from specific category in the system',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID of the category to find',
    type: String,
  })
  @ApiNotFoundResponse({
    type: NotFoundRequestSwagger,
  })
  @ApiOkResponse({
    description: 'Articles find successfully',
    type: ArticleEntity,
  })
  findAllCategory(@Param('id') id: string) {
    return this.articleService.findAllByCategory(id);
  }
}
