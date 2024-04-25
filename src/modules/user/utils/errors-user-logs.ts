import { BadRequestSwagger } from 'src/swagger/helpers/BadRequestError';
import { ForbiddenRequestSwagger } from 'src/swagger/helpers/ForbiddenRequestError';
import { NotFoundRequestSwagger } from 'src/swagger/helpers/NotFoundRequestErrro';

/***
 * LISTA DE ERROS NO USER SERVICE (USER_ERROR-{}):
 * - 01: Email que se tenta cadastrar já está em uso
 * - 02: Algum erro interno aconteceu ao tentar criar o usuário
 * - 03: Usuário que tenta acessar todos os usuários não é admin.
 * - 04: Usuário tenta acessar informações de outro usuário pelo ID, sendo que não possui autorização
 * - 05: ID informado na consulta não é válido, ou seja, não há um usuário.
 * - 06: Algum erro interno ocorreu ao atualizar os usuários
 * - 07: Algum erro interno aconteceu ao tentar deletar o usuário
 */

export class ErrorsUserLogs {
  USER_ERROR_01 = new BadRequestSwagger(
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

  USER_ERROR_06 = new BadRequestSwagger(
    'Some internal error ocurred',
    'Some internal error ocurred in user update',
    'USER_ERROR-07',
    'PUT {api_domain}/user/',
  );

  USER_ERROR_07 = new BadRequestSwagger(
    'Some internal error ocurred',
    'Some internal error ocurred in user deletion',
    'USER_ERROR-07',
    'DELETE {api_domain}/user/',
  );
}
