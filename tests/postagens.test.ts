import { testRequest } from './jest.setup';

describe('Postagens - integração', () => {

  let postagemCriada: any;

  describe('createPostagem', () => {
    it('deve criar uma nova postagem e retornar 201', async () => {
      const res = await testRequest('post', '/postagens')
        .send({
          titulo: `Postagem Teste ${Date.now()}`,
          conteudo: 'Conteúdo de teste',
          visivel: true
        });

        console.log(res.body)

        postagemCriada = res.body;

      expect(res.status).toBe(201);
    });
  });

describe('getAllPostagens', () => {
  it('deve retornar todas as postagens com header x-total-count', async () => {
    const res = await testRequest('get', '/postagens');

    expect(res.status).toBe(200);
    expect(res.headers['x-total-count']).not.toBe('0');
  });
});

describe('getPostagemById', () => {
  it('deve retornar a postagem pelo id', async () => {
    const res = await testRequest('get', `/postagens/${postagemCriada.id}`);

    expect(res.status).toBe(200);
  });
});

describe('getPostagensVisiveis', () => {
  it('deve retornar postagens visíveis com header x-total-count', async () => {
    const res = await testRequest('get', '/postagens');

    expect(res.status).toBe(200);
    expect(res.headers['x-total-count']).not.toBe('0');
  });
});

describe('updatePostagem', () => {
  it('deve atualizar uma postagem e retornar 200', async () => {
    const res = await testRequest('patch', `/postagens/${postagemCriada.id}`).send({
      titulo: 'Atualizado',
      conteudo: 'Conteúdo atualizado',
      visivel: false
    });

    expect(res.status).toBe(200);
    expect(res.body.titulo).toBe('Atualizado');
  });
});

 describe('deletePostagem', () => {
  it('deve deletar uma postagem e retornar 204', async () => {
    const res = await testRequest('delete', `/postagens/${postagemCriada.id}`);

    expect(res.status).toBe(204);
  });

  it('deve retornar 404 se não passar id', async () => {
    const res = await testRequest('delete', '/postagens/');

    expect(res.status).toBe(404);
  });
});
});
