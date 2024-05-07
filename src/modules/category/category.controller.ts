import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
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
import { ForbiddenRequestSwagger } from 'src/swagger/helpers/ForbiddenRequestError';
import { NotFoundRequestSwagger } from 'src/swagger/helpers/NotFoundRequestErrro';
import { CategoryEntity } from 'src/swagger/entities/category-entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Endpoint que permite criar uma categoria no sistema: ABERTO NO SWAGGER
  @Post()
  @ApiOperation({
    summary: 'Enables the creation of a category',
    description:
      'This endpoint allows the creation of a category in the system',
  })
  @ApiForbiddenResponse({
    type: ForbiddenRequestSwagger,
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
  })
  @ApiOkResponse({
    description: 'Category create successfully',
    type: CategoryEntity,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req: Request, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(req, createCategoryDto);
  }

  // Endpoint que permite achar todas as categorias do sistema: ABERTO NO SWAGGER
  @Get()
  @ApiOperation({
    summary: 'Enables to find all categories',
    description:
      'This endpoint allows to user find all categories in the system',
  })
  @ApiOkResponse({
    description: 'Categories find successfully',
    type: CategoryEntity,
    isArray: true,
  })
  findAll() {
    return this.categoryService.findAll();
  }

  // Endpoint que permite achar uma categoria por seu ID no sistema: ABERTO NO SWAGGER
  @Get(':id')
  @ApiOperation({
    summary: 'Enables find specific category',
    description:
      'This endpoint allows to user find specific category by ID in the system',
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
    description: 'Category find successfully',
    type: CategoryEntity,
  })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  // Endpoint que permite editar uma categoria por seu ID no sistema: ABERTO NO SWAGGER
  @Put(':id')
  @ApiOperation({
    summary: 'Enables update category',
    description:
      'This endpoint allows to user update category information in the system',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID of the category to update',
    type: String,
  })
  @ApiForbiddenResponse({
    type: ForbiddenRequestSwagger,
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
  })
  @ApiOkResponse({
    description: 'Category update successfully',
    type: CategoryEntity,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(req, id, updateCategoryDto);
  }

  // Endpoint que permite deletar uma categoria por seu ID no sistema: ABERTO NO SWAGGER
  @Delete(':id')
  @ApiOperation({
    summary: 'Enables delete category',
    description: 'This endpoint allows to user delete category in system',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID of the category to delete',
    type: String,
  })
  @ApiForbiddenResponse({
    type: ForbiddenRequestSwagger,
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
  })
  @ApiOkResponse({
    description: 'Category delete successfully',
    type: CategoryEntity,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.categoryService.remove(req, id);
  }
}
