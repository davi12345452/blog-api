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
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from 'src/swagger/entities/user-entity';
import { BadRequestSwagger } from 'src/swagger/helpers/BadRequestError';
import { ForbiddenRequestSwagger } from 'src/swagger/helpers/ForbiddenRequestError';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint que permite a criação de um usuário. Sem a utilização de autenticação: ABERTO NO SWAGGER
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
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // Endpoint que permite achar todos os usuários do sistema: ABERTO NO SWAGGER
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
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req: Request) {
    return this.userService.findAll(req);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.userService.findOne(req, id);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req: Request) {
    return this.userService.remove(req);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  updatePassoword(
    @Req() req: Request,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(req, updatePasswordDto);
  }
}
