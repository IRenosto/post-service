import { Request, Response } from 'express';
import { IBodyCreatePostagensController, IBodyUpdatePostagensController, IParamsIdGlobal, IQueryGetPostagens } from '../interfaces';
import { decoder } from '../middlewares';
import { errorHandler } from '../middlewares/errorHandler';
import { postagensProvider } from '../services';
  
export const createPostagem = async (req: Request<{}, {}, IBodyCreatePostagensController>, res: Response) => {
    try {
        const autorRequest = await decoder(req);
        const nomeAutor = autorRequest ? `${autorRequest.nome} ${autorRequest.sobrenome}` : 'desconhecido';

        const foto_url = req.file ? `${req.file.filename}` : undefined;

        const resultPostagem = await postagensProvider.createPostagem({
            titulo: req.body.titulo,
            conteudo: req.body.conteudo,
            visivel: req.body.visivel,
            foto_url,
            usuario_cadastrador: nomeAutor,
            usuario_atualizador: nomeAutor,
        });

        return res.status(201).json(resultPostagem);
    }
    catch (error) {
        errorHandler(error, res);
    }
};

export const deletePostagem = async (req: Request<IParamsIdGlobal>, res: Response) => {
    try {
    if (!req.params.id) {
        return res.status(400).json({
            errors: 'O parâmetro "id" precisa ser informado'
        });
    }

    await postagensProvider.deletePostagem(req.params.id);

    return res.status(204).send();
}
catch (error) {
    errorHandler(error, res);
}
};

export const getAllPostagens = async (req: Request<{}, {}, {}, IQueryGetPostagens>, res: Response) => {
try {
    const result = await postagensProvider.getAllPostagens(
        req.query.page,
        req.query.limit,
        req.query.filter,
    );

     const totalCount = result.length;

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', totalCount);

    return res.status(200).json(result);
}
    catch (error) {
        errorHandler(error, res);
    }
};

export const getPostagemById = async (req: Request<IParamsIdGlobal>, res: Response) => {
try {
    if (!req.params.id) {
        return res.status(400).json({
            errors: 'O parâmetro "id" precisa ser informado'
        });
    }

    const result = await postagensProvider.getPostagemById(req.params.id);

    return res.status(200).json(result);
}
catch (error) {
    errorHandler(error, res);
}
};

export const getPostagensVisiveis = async (req: Request<{}, {}, {}, IQueryGetPostagens>, res: Response) => {
    try {
        const result = await postagensProvider.getPostagensVisiveis(
            req.query.page,
            req.query.limit,
            req.query.filter,
        );
    
         const totalCount = result.length;
    
        res.setHeader('access-control-expose-headers', 'x-total-count');
        res.setHeader('x-total-count', totalCount);
    
        return res.status(200).json(result);
    }
        catch (error) {
            errorHandler(error, res);
        }
};

export const updatePostagem = async (req: Request<IParamsIdGlobal, {}, IBodyUpdatePostagensController>, res: Response) => {
try {
    const autorRequest = await decoder(req);

    if (!req.params.id) {
        return res.status(400).json({
            errors:  'O parâmetro "id" precisa ser informado'
     });
    }
    
    const foto_url = req.file ? `${req.file.filename}` : undefined;

    const result = await postagensProvider.updatePostagem(Number(req.params.id), {
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        visivel: req.body.visivel,
        foto_url,
        usuario_atualizador: `${autorRequest?.nome} ${autorRequest?.sobrenome}` || 'desconhecido'
    });


    return res.status(200).json(result);
}
    catch (error) {
        errorHandler(error, res);
    }
};


