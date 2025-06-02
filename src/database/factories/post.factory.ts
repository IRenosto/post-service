import { setSeederFactory } from 'typeorm-extension';
import { Postagem } from '../entities';

export default setSeederFactory(Postagem, async (faker) => {
    const getRandomIntegerInclusive = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomInteger = getRandomIntegerInclusive(1, 1000);

    const fotoLocal = process.env.SALVAR_FOTO_LOCAL === 'true';

    const foto_url = `https://picsum.photos/seed/${randomInteger}/400/200`;

    const post = new Postagem();

    post.titulo = faker.lorem.sentence().substring(0, 50);
    post.conteudo = faker.lorem.paragraphs({ min: 3, max: 5 });
    post.visivel = faker.datatype.boolean();
    post.usuario_atualizador = 'seed';
    post.usuario_cadastrador = 'seed';
    post.foto_url = foto_url;

    return post;
});
