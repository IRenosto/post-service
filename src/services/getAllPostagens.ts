import { Postagem } from '../database/entities';
import { postagemRepository } from '../database/repositories';

export const getAllPostagens = async (
  page?: number,
  limit?: number,
  filter?: string
): Promise<Postagem[]> => {
    const query = postagemRepository.createQueryBuilder('postagem');

    if (filter) {
      query.andWhere(
        `(LOWER(postagem.titulo) LIKE LOWER(:filter) OR LOWER(postagem.conteudo) LIKE LOWER(:filter))`,
        { filter: `%${filter}%` }
      );
    }

    query.orderBy('postagem.id', 'ASC');

    if (typeof page === 'number' && typeof limit === 'number' && page > 0 && limit > 0) {
      query.skip((page - 1) * limit);
      query.take(limit);
    }

    return  await query.getMany();
};
