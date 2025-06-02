import { Postagem } from '../database/entities';
import { postagemRepository } from '../database/repositories';
import { NotFoundError } from '../errors/customErrors';

export const getPostagemById = async (
  id: number
): Promise<Postagem> => {
    const postagem = await postagemRepository.findOne({ 
        where: { id } 
    });

    if (!postagem) {
        throw new NotFoundError('Postagem não encontrada');
    }

    return postagem;
};