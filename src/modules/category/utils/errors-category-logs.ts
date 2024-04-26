import { BadRequestSwagger } from 'src/swagger/helpers/BadRequestError';
import { ForbiddenRequestSwagger } from 'src/swagger/helpers/ForbiddenRequestError';
import { NotFoundRequestSwagger } from 'src/swagger/helpers/NotFoundRequestErrro';

/***
 * LISTA DE ERROS NO USER SERVICE (CATEGORY_ERROR-{}):
 * - 01: Usuário que chama a criação precisa ser ADMIN.
 * - 02: Algum erro interno aconteceu na criação de categoria.
 * - 03: ID passado como parâmetro não pertence a nenhuma categoria
 * - 04: Usuário que chama a edição precisa ser ADMIN.
 * - 05: Algum erro interno aconteceu na edição de categoria.
 * - 06: Usuário que chama a deleção precisa ser ADMIN.
 * - 07: Algum erro interno aconteceu na deleção de categoria.
 */

export class ErrorsCategoryLogs {
  CATEGORY_ERROR_01 = new ForbiddenRequestSwagger(
    'User must be ADMIN',
    'User must be ADMIN to create any category',
    'CATEGORY_ERROR-01',
    'POST {api_domain}/category/',
  );

  CATEGORY_ERROR_02 = new BadRequestSwagger(
    'Some internal error ocurred',
    'Some internal error ocurred in category creation',
    'CATEGORY_ERROR-02',
    'POST {api_domain}/category/',
  );

  CATEGORY_ERROR_03 = new NotFoundRequestSwagger(
    'Category ID Invalid',
    `ID passed dont belongs to any category in database`,
    'CATEGORY_ERROR-03',
    'GET {api_domain}/category/:id',
  );

  CATEGORY_ERROR_04 = new ForbiddenRequestSwagger(
    'User must be ADMIN',
    'User must be ADMIN to edit any category',
    'CATEGORY_ERROR-04',
    'PUT {api_domain}/category/:id',
  );

  CATEGORY_ERROR_05 = new BadRequestSwagger(
    'Some internal error ocurred',
    'Some internal error ocurred in category edition',
    'CATEGORY_ERROR-05',
    'PUT {api_domain}/category/:id',
  );

  CATEGORY_ERROR_06 = new ForbiddenRequestSwagger(
    'User must be ADMIN',
    'User must be ADMIN to delete any category',
    'CATEGORY_ERROR-06',
    'DELETE {api_domain}/category/:id',
  );

  CATEGORY_ERROR_07 = new BadRequestSwagger(
    'Some internal error ocurred',
    'Some internal error ocurred in category deletion',
    'CATEGORY_ERROR-07',
    'DELETE {api_domain}/category/:id',
  );
}
