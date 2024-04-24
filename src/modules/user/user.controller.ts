import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.userService.findAll(req);
  }

  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: string) {
    return this.userService.findOne(req, id);
  }

  @Put()
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req, updateUserDto);
  }

  @Delete()
  remove(@Req() req: Request) {
    return this.userService.remove(req);
  }
}
