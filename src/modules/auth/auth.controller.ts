import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UnauthorizedRequestSwagger } from 'src/swagger/helpers/UnauthorizedRequestError';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Enables user login',
    description: 'This endpoint allows the login with email and password',
  })
  @ApiOkResponse({
    description: 'User authenticated sucessfully',
    schema: {
      example: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2Y2U4ZTc4Yy0zMDYyLTRlYzItYWI0Yi01MzkxMTdiNjJlYTciLCJlbWFpbCI6ImRhdmlqYW5pc2NoYW1haWFAZ21haWwuY29tIiwidHlwZSI6IkNPTU1PTiIsImlhdCI6MTcxNTEwNjQxNiwiZXhwIjoxNzE1MTEwMDE2fQ.92Bjvw4AozRkozWOq-SjKM50ORVqqw4BWiZU5VxUFSE',
      },
    },
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedRequestSwagger,
  })
  @ApiBody({
    schema: {
      example: {
        email: 'davijanischamaia@gmail.com',
        password: '!Davi232',
      },
    },
  })
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
