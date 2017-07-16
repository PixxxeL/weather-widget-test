import path from 'path';
import pug from 'pug';
import Redis from 'ioredis';

import { app, passport, errStr } from  './init';
import { Widget, CITY_MAPPING, DAYS_CHOISES } from './models/Widget';
import config from '../config.json';
import log from './utils/log';


app.get('/', (req, res) => {
    if (req.user) {
        return res.redirect('/widgets');
    }
    log.info('Request home page...');
    let error = req.flash('error');
    res.render('index', {
        user : req.user,
        error : error.length ? error.join(' ') : null
    });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/widgets',
    failureRedirect: '/',
    failureFlash: errStr
}));

app.get('/logout', (req, res) => {
    log.info('Request logout page...');
    req.logout();
    res.redirect('/');
});

app.get('/widgets', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    log.info('Request widgets page...');
    Widget.find({user:req.user}, (err, widgets) => {
        res.render('widgets/list.pug', {
            user : req.user,
            baseUrl : config.baseUrl,
            cities : CITY_MAPPING,
            widgets : widgets || []
        });
    });
});

const getWidgetFromData = (user, widget, mode) => {return {
    user : user,
    widget : widget,
    cities : CITY_MAPPING,
    days : DAYS_CHOISES,
    mode : mode
};};

app.get('/widgets/add', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    log.info('Request widget add form page...');
    res.render('widgets/form.pug', getWidgetFromData(req.user, null, 'Добавить'));
});


app.post('/widgets/add', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    log.info('Request widget add page...');
    let widget = req.body;
    widget.user = req.user;
    Widget.create(widget, function (err, data) {
        if (!err) {
            return res.redirect('/widgets');
        } else {
            // flash.set need here
            res.render('widgets/form.pug', getWidgetFromData(req.user, data, 'Добавить'));
        }
    });
});

app.get('/widgets/:id/edit', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    log.info('Request widget edit form page...');
    Widget.findById(req.params.id, function (err, data) {
        if (!err) {
            res.render('widgets/form.pug', getWidgetFromData(req.user, data, 'Редактировать'));
        } else {
            // flash.set need here
            return res.redirect('/widgets');
        }
    });
});

app.post('/widgets/:id/edit', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    log.info('Request widget edit page...');
    Widget.update({ _id : req.params.id }, { $set : req.body }, function (err, data) {
        if (!err) {
            return res.redirect(`/widgets`);
        } else {
            // flash.set need here
            return res.redirect(`/widgets/${data.id}/edit`);
        }
    });
});

app.get('/widgets/:id/del', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    log.info('Request widget del page...');
    Widget.findById(req.params.id).remove((err, data) => {
        // chech error and flash.set need here
        res.redirect('/widgets');
    });
});

app.get('/widgets/:id.js', (req, res) => {
    const errorResponse = (msg) => {
        return `console.error('${msg}');`;
    };
    Widget.findById(req.params.id, function (err, wData) {
        if (!err) {
            const redis = new Redis();
            redis.get(wData.city).then(function (rData) {
                if (rData) {
                    const data = JSON.parse(rData);
                    const filepath = './server/views/widgets/widget.tpl.pug';
                    const cityName = Object.keys(CITY_MAPPING)[
                        Object.values(CITY_MAPPING).indexOf(wData.city)
                    ];
                    let temp = data && data.main ? data.main.temp : '-';
                    try {
                        temp = parseInt(temp, 10);
                        temp = temp > 0 ? `+${temp}` : temp;
                    } catch (err) {}
                    let labelStyle, cityStyle, tempStyle;
                    if (wData.vertical) {
                        labelStyle = '';
                        cityStyle = 'font-weight:bold;font-size:14px;';
                        tempStyle = 'font-size:36px;';
                    } else {
                        labelStyle = 'margin-right:5px;display:inline-block;';
                        cityStyle = 'margin-right:5px;font-weight:bold;display:inline-block;';
                        tempStyle = 'font-weight:bold;display:inline-block;';
                    }
                    const html = pug.compileFile(path.resolve(filepath))({
                        city : cityName,
                        temp : temp,
                        labelStyle : labelStyle,
                        cityStyle : cityStyle,
                        tempStyle : tempStyle
                    });
                    res.send(`document.write('${html}');`);
                } else {
                    res.send(errorResponse('No weather data in database!'));
                }
            });
        } else {
            res.send(errorResponse('Wrong weather service script!'));
        }
    });
    
});
