import { BadRequestSwagger } from 'src/swagger/helpers/BadRequestError';
import { ForbiddenRequestSwagger } from 'src/swagger/helpers/ForbiddenRequestError';
import { NotFoundRequestSwagger } from 'src/swagger/helpers/NotFoundRequestErrro';

/***
 * LISTA DE ERROS NO USER SERVICE (CATEGORY_ERROR-{}):
 * - 01: Email que se tenta cadastrar já está em uso
 * - 02: Algum erro interno aconteceu ao tentar criar o usuário
 * - 03: Usuário que tenta acessar todos os usuários não é admin.
 * - 04: Usuário tenta acessar informações de outro usuário pelo ID, sendo que não possui autorização
 * - 05: ID informado na consulta não é válido, ou seja, não há um usuário.
 * - 06: Algum erro interno ocorreu ao atualizar os usuários
 * - 07: Algum erro interno aconteceu ao tentar deletar o usuário
 * - 08:
 * - 09:
 * - 10:
 */

export class ErrorsArticleLogs {
  CATEGORY_ERROR_01 = new BadRequestSwagger(
    'Some error in article creation',
    'Some error ocurred in creation of an article',
    'ARTICLE_ERROR-01',
    'POST {api_domain}/article/',
  );

  CATEGORY_ERROR_02 = new NotFoundRequestSwagger(
    'ID invalid',
    'Article ID passed to find specific article is invalid',
    'ARTICLE_ERROR-02',
    'GET {api_domain}/article/:id',
  );

  CATEGORY_ERROR_03 = new NotFoundRequestSwagger(
    'Slug invalid',
    `Article SLUG passed to find specific article is invalid`,
    'ARTICLE_ERROR-03',
    'GET {api_domain}/article/slug/:slug',
  );

  CATEGORY_ERROR_04 = new NotFoundRequestSwagger(
    'ID invalid',
    'Article ID passed to edit specific article is invalid',
    'ARTICLE_ERROR-04',
    'PUT {api_domain}/article/:id',
  );

  CATEGORY_ERROR_05 = new ForbiddenRequestSwagger(
    'Invalid Credentials',
    'Article dont belong to user and he is not an ADMIN',
    'ARTICLE_ERROR-05',
    'PUT {api_domain}/article/:id',
  );

  CATEGORY_ERROR_06 = new BadRequestSwagger(
    'Some error in article edition',
    'Some error ocurred in edition of an article',
    'ARTICLE_ERROR-06',
    'PUT {api_domain}/article/:id',
  );

  CATEGORY_ERROR_07 = new NotFoundRequestSwagger(
    'ID invalid',
    'Article ID passed to edit specific article is invalid',
    'ARTICLE_ERROR-07',
    'DELETE {api_domain}/article/:id',
  );

  CATEGORY_ERROR_08 = new ForbiddenRequestSwagger(
    'Invalid Credentials',
    'Article dont belong to user and he is not an ADMIN',
    'ARTICLE_ERROR-08',
    'DELETE {api_domain}/article/:id',
  );

  CATEGORY_ERROR_09 = new BadRequestSwagger(
    'Some error in article deletion',
    'Some error ocurred in deletion of an article',
    'ARTICLE_ERROR-09',
    'DELETE {api_domain}/article/:id',
  );

  CATEGORY_ERROR_10 = new NotFoundRequestSwagger(
    'Invalid Category ID',
    'Category ID passed to find specifics articles is invalid',
    'ARTICLE_ERROR-10',
    'GET {api_domain}/article/category/:id',
  );
}
