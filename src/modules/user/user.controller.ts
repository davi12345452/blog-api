import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from 'src/swagger/entities/user-entity';
import { BadRequestSwagger } from 'src/swagger/helpers/BadRequestError';
import { ForbiddenRequestSwagger } from 'src/swagger/helpers/ForbiddenRequestError';
import { NotFoundRequestSwagger } from 'src/swagger/helpers/NotFoundRequestErrro';
import { UnauthorizedRequestSwagger } from 'src/swagger/helpers/UnauthorizedRequestError';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint que permite a criação de um usuário. Sem a utilização de autenticação: ABERTO NO SWAGGER
  @Post()
  @ApiOperation({
    summary: 'Enables the creation of an user',
    description: 'This endpoint allows the creation of an user in the system',
  })
  @ApiOkResponse({
    description: 'User created successfully',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Endpoint que permite achar todos os usuários do sistema: ABERTO NO SWAGGER
  @Get()
  @ApiOperation({
    summary: 'Enables to find all users',
    description: 'This endpoint allows to user find all users in the system',
  })
  @ApiOkResponse({
    description: 'Users find successfully',
    type: UserEntity,
    isArray: true,
  })
  @ApiForbiddenResponse({
    type: ForbiddenRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req: Request) {
    return this.userService.findAll(req);
  }

  // Endpoint que permite achar um usuário específico pelo seu ID: ABERTO NO SWAGGER
  @Get(':id')
  @ApiOperation({
    summary: 'Enables find specific user',
    description:
      'This endpoint allows to user find specific user in the system',
  })
  @ApiOkResponse({
    description: 'User find successfully',
    type: UserEntity,
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'UUID of the user to find',
    type: String,
  })
  @ApiForbiddenResponse({
    type: ForbiddenRequestSwagger,
  })
  @ApiNotFoundResponse({
    type: NotFoundRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.userService.findOne(req, id);
  }

  // Endpoint que permite que um usuário atualize seus dados: ABERTO NO SWAGGER
  @Put()
  @ApiOperation({
    summary: 'Enables update user',
    description:
      'This endpoint allows to user udpate his informations in system',
  })
  @ApiOkResponse({
    description: 'User updated successfully',
    type: UserEntity,
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req, updateUserDto);
  }

  // Endpoint que permite que um usuário delete sua conta: ABERTO NO SWAGGER
  @Delete()
  @ApiOperation({
    summary: 'Enables delete user',
    description:
      'This endpoint allows to user delete his informations in system',
  })
  @ApiOkResponse({
    description: 'User deleted successfully',
    schema: {
      example: {
        message: 'Succes to delete user',
        id: '550e8400-e29b-41d4-a716-446655440000',
      },
    },
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req: Request) {
    return this.userService.remove(req);
  }

  // Endpoint que permite que um usuário atualize sua senha: ABERTO NO SWAGGER
  @Put('/password')
  @ApiOperation({
    summary: 'Enables update password user',
    description: 'This endpoint allows to user update his password in system',
  })
  @ApiOkResponse({
    description: 'Password updated successfully',
    schema: {
      example: {
        message: 'Password updated sucessufully',
      },
    },
  })
  @ApiBadRequestResponse({
    type: BadRequestSwagger,
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedRequestSwagger,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  updatePassoword(
    @Req() req: Request,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(req, updatePasswordDto);
  }
}
