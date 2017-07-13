import config from '../config.json';
import { app } from  './init';
import './routes';


app.listen(config.serverPort, () => {
    console.log(`Сервер запущен на ${config.serverPort} порту...`);
});
