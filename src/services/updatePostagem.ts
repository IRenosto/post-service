import { Postagem } from '../database/entities';
import { postagemRepository } from '../database/repositories';
import { NotFoundError } from '../errors/customErrors';
import { IBodyUpdatePostagens } from '../interfaces';
import fs from 'fs';
import path from 'path';
import { UPLOAD_DIR } from '../middlewares/multer';

export const updatePostagem = async (id: number, postagemNova: IBodyUpdatePostagens): Promise<Postagem> => {
    const postagemCadastrada = await postagemRepository.findOneBy({ id });

    if (!postagemCadastrada) {
      throw new NotFoundError('Postagem não encontrada');
    }

    postagemCadastrada.titulo = postagemNova.titulo ?? postagemCadastrada.titulo
    postagemCadastrada.conteudo = postagemNova.conteudo ?? postagemCadastrada.conteudo
    postagemCadastrada.visivel = postagemNova.visivel ?? postagemCadastrada.visivel
    postagemCadastrada.usuario_atualizador = postagemNova.usuario_atualizador ?? postagemCadastrada.usuario_atualizador

    if (postagemNova.foto_url) {
      if (postagemCadastrada.foto_url) {
          const caminhoAntigo = path.join(UPLOAD_DIR, path.basename(postagemCadastrada.foto_url));
          fs.unlink(caminhoAntigo, (err) => {
            if (err) {
                console.warn(`Erro ao deletar imagem antiga: ${caminhoAntigo}`, err);
            } else {
                console.log(`Foto deletada: ${caminhoAntigo}`);
            }
        });
      }

      postagemCadastrada.foto_url = postagemNova.foto_url;
    }

    const postagemAtualizada =  await postagemRepository.save(postagemCadastrada);

    return postagemAtualizada;
};