import { BadRequestSwagger } from 'src/swagger/helpers/BadRequestError';
import { ForbiddenRequestSwagger } from 'src/swagger/helpers/ForbiddenRequestError';
import { NotFoundRequestSwagger } from 'src/swagger/helpers/NotFoundRequestErrro';

export class ErrorsUserLogs {
  USER_ERROR_O1 = new BadRequestSwagger(
    'Email already in use',
    'The email passed to create account has already in use',
    'USER_ERROR-01',
    'POST {api_domain}/user/',
  );

  USER_ERROR_02 = new BadRequestSwagger(
    'Some internal error ocurred',
    'Some internal error ocurred in user creation',
    'USER_ERROR-02',
    'POST {api_domain}/user/',
  );

  USER_ERROR_03 = new ForbiddenRequestSwagger(
    'Only admin can call this endpoint',
    `Only admin users can access all users information. Your type of user is: COMMON`,
    'USER_ERROR-03',
    'GET {api_domain}/user/',
  );

  USER_ERROR_04 = new ForbiddenRequestSwagger(
    'You just can access your user information',
    `Only admin users can access another users informations. Your type of user is COMMON`,
    'USER_ERROR-04',
    'GET {api_domain}/user/:id',
  );

  USER_ERROR_05 = new NotFoundRequestSwagger(
    'User id informed not exists',
    'ID informed in parametres not pertences to a user in our database',
    'USER_ERROR-05',
    'GET {api_domain}/user/:id',
  );

  USER_ERROR_06 = new ForbiddenRequestSwagger(
    'You just can delete your account',
    `You can only delete your account. Id passed dont belongs to you.`,
    'USER_ERROR-06',
    'DELETE {api_domain}/user/:id',
  );

  USER_ERROR_07 = new BadRequestSwagger(
    'Some internal error ocurred',
    'Some internal error ocurred in user deletion',
    'USER_ERROR-07',
    'DELETE {api_domain}/user/',
  );
}
