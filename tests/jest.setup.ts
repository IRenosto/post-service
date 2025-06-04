jest.mock('multer', () => {
    const multer = () => ({
        single: () => (req: any, res: any, next: any) => next()
    });

    multer.diskStorage = jest.fn(() => ({}));

    return multer;
});

import supertest from 'supertest';
import { server } from '../src/server';
import { AppDataSource } from '../src/database/data-source';
import jwt from 'jsonwebtoken';
import * as authUtils from '../src/middlewares/auth';

beforeAll(async () => {
    await AppDataSource.initialize();

    process.env.JWT_SECRET = 'meuSegredo';

    jest.spyOn(authUtils, 'decoder').mockImplementation(async () => {
        return {
            id: 1,
            nome: 'Test',
            sobrenome: 'Test',
            permissoes: [
                'POSTAGEM_ESCRITA', 
                'POSTAGEM_LEITURA',
                'POSTAGEM_DELECAO'
            ]
        };
    });
});

afterAll(async () => {
    await AppDataSource.destroy();
});

export const testServer = supertest(server);

export const testRequest = (method: 'get' | 'post' | 'put' | 'delete' | 'patch', url: string) => {

    const token = jwt.sign(
            {
                id: 1
            },
            process.env.JWT_SECRET!,
            {
                expiresIn: '1h'
            }
        );

    return testServer[method](url).set({ Authorization: `Bearer ${token}` });
};
