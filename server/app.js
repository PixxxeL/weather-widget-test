import config from '../config.json';
import log from './utils/log';
import { app } from  './init';
import './routes';


app.listen(config.serverPort, () => {
    log.info(`Сервер запущен на ${config.serverPort} порту...`);
});
