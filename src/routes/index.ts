import { Router } from 'express';
import multer from 'multer';
import { postagensHandler } from '../controllers';
import { ensureAuthenticated, authorization, register } from '../middlewares';
import { createMulterConfig } from '../middlewares/multer';

const router = Router();
const upload = multer(createMulterConfig());

/**
 * @swagger
 * tags:
 *   - name: Postagens
 *     description: Gerenciamento de permissões
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de sucesso
 *     responses:
 *       200:
 *         description: Mensagem de sucesso
 */
router.get('/', (_, res) => {
  return res.status(200).send('Servico de postagem funcionando corretamente.');
  });

/**
 * @swagger
 * /metrics:
 *   get:
 *     summary: Retorna métricas do Prometheus
 *     responses:
 *       200:
 *         description: Métricas do Prometheus
 */
router.get('/metrics', async (_, res) => {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
});


//Postagens
/**
 * @swagger
 * /postagens:
 *   post:
 *     summary: Cria uma nova postagem
 *     tags: [Postagens]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               visivel:
 *                 type: boolean
 *               foto:
 *                 type: string
 *                 format: binary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Postagem criada com sucesso
 */
router.post(
  '/postagens',
  ensureAuthenticated,
  authorization(['POSTAGEM_ESCRITA']),
  upload.single('imagem'),
  postagensHandler.createPostagemValidation,
  postagensHandler.createPostagem
);

/**
 * @swagger
 * /postagens/{id}:
 *   delete:
 *     summary: Deleta uma postagem pelo ID
 *     tags: [Postagens]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Postagem deletada com sucesso
 */
router.delete(
  '/postagens/:id', ensureAuthenticated, authorization(['POSTAGEM_DELECAO']), postagensHandler.deletePostagemValidation, postagensHandler.deletePostagem);

/**
 * @swagger
 * /postagens/administrador:
 *   get:
 *     summary: Retorna todas as postagens
 *     tags: [Postagens]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *       - name: filter
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de postagens
 */
router.get('/postagens/administrador', ensureAuthenticated, authorization(['POSTAGEM_ESCRITA']), postagensHandler.getAllPostagensValidation, postagensHandler.getAllPostagens);

/**
 * @swagger
 * /postagens/{id}:
 *   get:
 *     summary: Retorna uma postagem pelo ID
 *     tags: [Postagens]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Detalhes da postagem
 */
router.get('/postagens/:id', postagensHandler.getPostagemByIdValidation, postagensHandler.getPostagemById);

/**
 * @swagger
 * /postagens:
 *   get:
 *     summary: Retorna todas as postagens visíveis
 *     tags: [Postagens]
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *       - name: filter
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de postagens visíveis
 */
router.get('/postagens', postagensHandler.getPostagensVisiveisValidation, postagensHandler.getPostagensVisiveis);

/**
 * @swagger
 * /postagens/{id}:
 *   patch:
 *     summary: Atualiza uma postagem pelo ID
 *     tags: [Postagens]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               conteudo:
 *                 type: string
 *               visivel:
 *                 type: boolean
 *               imagem:
 *                 type: string
 *                 format: binary
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Postagem atualizada com sucesso
 */
router.patch('/postagens/:id', ensureAuthenticated, authorization(['POSTAGEM_ESCRITA']), upload.single('imagem'), postagensHandler.updatePostagemValidation, postagensHandler.updatePostagem);



export { router };