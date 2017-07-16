import request from 'request-promise-native';
import Redis from 'ioredis';
import config from '../../config.json';
import { CITY_MAPPING } from '../models/Widget';

const URL = 'http://api.openweathermap.org/data/2.5/weather?APPID=';

const redis = new Redis();

Promise.all(Object.keys(CITY_MAPPING).map((ru) => {
    const en = CITY_MAPPING[ru];
    let url = `${URL}${config.openWeatherId}&q=${en}&lang=ru&units=metric`;
    return request(url, (error, response, body) => {
        console.log(`Recieve ${ru}...`);
        if (!error && response.statusCode == 200) {
            redis.set(en, body);
            console.log(`  and save...`);
        }
    });
})).then(process.exit);
