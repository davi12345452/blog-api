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

export class ErrorsCategoryLogs {}
