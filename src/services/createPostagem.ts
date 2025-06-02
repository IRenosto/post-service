import { postagemRepository } from '../database/repositories';
import { IBodyCreatePostagens } from '../interfaces';
import { Postagem } from '../database/entities';

export const createPostagem = async (postagem: IBodyCreatePostagens): Promise<Postagem> => {
        const novaPostagem = postagemRepository.create({
            titulo: postagem.titulo,
            conteudo: postagem.conteudo,
            visivel: postagem.visivel ?? true,
            usuario_cadastrador: postagem.usuario_cadastrador ?? 'admin',
            usuario_atualizador: postagem.usuario_atualizador ?? 'admin',
            foto_url: postagem.foto_url
        });

        const result = await postagemRepository.save(novaPostagem);

        return result;
};