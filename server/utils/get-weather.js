import request from 'request';
import Redis from 'ioredis';
import config from '../../config.json';
import { CITY_MAPPING } from '../models/Widget';

const URL = 'http://api.openweathermap.org/data/2.5/weather?APPID=';

const redis = new Redis();

for (let [ru, en] of Object.entries(CITY_MAPPING)) {
    let url = `${URL}${config.openWeatherId}&q=${en}&lang=ru&units=metric`;
    request(url, (error, response, body) => {
        console.log(`Recieve ${ru}...`);
        if (!error && response.statusCode == 200) {
            redis.set(en, body);
            console.log(`  save...`);
        }
    });
}

setTimeout(process.exit, config.getWeatherTimeout);
