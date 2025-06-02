import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Postagem } from '../entities';

export default class PostSeeder implements Seeder {

    track = false;

    public async run(_dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {

        const postFactory = factoryManager.get(Postagem);

        await postFactory.saveMany(100);
    }
}
