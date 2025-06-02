import 'reflect-metadata';
import { AppDataSource } from './database/data-source';
import { server } from './server';

AppDataSource.initialize().then(async () => {

    console.log(`\nBanco de dados conectado\n`);

    server.listen(process.env.PORT, async () => {
        console.log(`Post Service rodando no endereço: http://${process.env.HOST}:${process.env.PORT}\n`);
    });

}).catch(err => console.error('Error initializing Data Source:', err));
