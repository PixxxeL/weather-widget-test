import request from 'request';
import config from '../../config.json';

const URL = 'http://api.openweathermap.org/data/2.5/weather?APPID='

let city = 'Moskow';

var options = {
    url: `${URL}${config.openWeatherId}&q=${city}`
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        console.log(info);
    }
}

request(options, callback);
