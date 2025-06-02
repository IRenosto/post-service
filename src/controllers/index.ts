import * as postagemController from './postagemController';
import * as postagemValidator from './postagemValidator';

export const postagensHandler = {
    ...postagemController,
    ...postagemValidator,
};