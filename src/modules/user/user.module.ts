import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ErrorsUserLogs } from './utils/errors-user-logs';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, ErrorsUserLogs],
})
export class UserModule {}
