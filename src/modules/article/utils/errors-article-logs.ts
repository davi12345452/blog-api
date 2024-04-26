import { BadRequestSwagger } from 'src/swagger/helpers/BadRequestError';
import { ForbiddenRequestSwagger } from 'src/swagger/helpers/ForbiddenRequestError';
import { NotFoundRequestSwagger } from 'src/swagger/helpers/NotFoundRequestErrro';

/***
 * LISTA DE ERROS NO USER SERVICE (CATEGORY_ERROR-{}):
 * - 01: Algum erro interno aconteceu na criação de artigo.
 * - 02: ID passado como parâmetro não pertence a nenhum artigo.
 * - 03: SLUG passado como parâmetro não pertence a nenhum artigo.
 * - 04: ID passado como parâmetro não pertence a nenhum artigo na edição de artigo.
 * - 05: Usuário inválido para editar artigo. Precisa ser ADMIN ou o dono.
 * - 06: Algum erro interno aconteceu na edição de artigo.
 * - 07: ID passado como parâmetro não pertence a nenhum artigo na deleção de artigo.
 * - 08: Usuário inválido para deletar artigo. Precisa ser ADMIN ou o dono.
 * - 09: Algum erro interno aconteceu na deleção de artigo.
 * - 10: ID passado como parâmetro não pertence a nenhuma categoria
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
