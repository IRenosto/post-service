import * as createPostagem from './createPostagem';
import * as deletePostagem from './deletePostagem';
import * as getAllPostagens from './getAllPostagens';
import * as getPostagemById from './getPostagemById';
import * as getPostagensVisiveis from './getPostagensVisiveis';
import * as updatePostagem from './updatePostagem';



export const postagensProvider = {
    ...createPostagem,
    ...deletePostagem,
    ...getAllPostagens,
    ...getPostagemById,
    ...getPostagensVisiveis,
    ...updatePostagem,
};