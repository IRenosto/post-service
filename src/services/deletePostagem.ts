import fs from 'fs';
import path from 'path';
import { postagemRepository } from "../database/repositories";
import { NotFoundError } from '../errors/customErrors';
import { UPLOAD_DIR } from '../middlewares/multer';

export const deletePostagem = async (id: number): Promise<void> => {
        const postagem = await postagemRepository.findOneBy({ id });

        if (!postagem) {
            throw new NotFoundError('Postagem não encontrada');
        }

        if (postagem.foto_url && !postagem.foto_url.startsWith('https')) {
            const fotoPath = path.join(UPLOAD_DIR, path.basename(postagem.foto_url));

            fs.unlink(fotoPath, (err) => {
                if (err) {
                    console.warn(`Erro ao deletar a foto: ${err.message}`);
                } else {
                    console.log(`Foto deletada: ${fotoPath}`);
                }
            });
        }

        await postagemRepository.remove(postagem);
};