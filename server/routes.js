import { app, passport, errStr } from  './init';
import { Widget, CITY_MAPPING, DAYS_CHOISES } from './models/Widget';
import config from '../config.json';


app.get('/', (req, res) => {
    console.log('Request home page...');
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
    console.log('Request logout page...');
    req.logout();
    res.redirect('/');
});

app.get('/widgets', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    console.log('Request widgets page...');
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
    console.log('Request widget add form page...');
    res.render('widgets/form.pug', getWidgetFromData(req.user, null, 'Добавить'));
});


app.post('/widgets/add', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    console.log('Request widget add page...');
    let widget = req.body;
    widget.user = req.user;
    Widget.create(widget, function (err, data) {
        if (!err) {
            return res.redirect('/widgets');
        } else {
            res.render('widgets/form.pug', getWidgetFromData(req.user, data, 'Добавить'));
        }
    });
});

app.get('/widgets/:id/edit', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    console.log('Request widget edit form page...');
    Widget.findById(req.params.id, function (err, data) {
        if (!err) {
            res.render('widgets/form.pug', getWidgetFromData(req.user, data, 'Редактировать'));
        } else {
            return res.redirect('/widgets');
        }
    });
});

app.post('/widgets/:id/edit', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    console.log('Request widget edit page...');
    Widget.update({ _id : req.params.id }, { $set : req.body }, function (err, data) {
        if (!err) {
            return res.redirect(`/widgets`);
        } else {
            return res.redirect(`/widgets/${data.id}/edit`);
        }
    });
});

app.get('/widgets/:id/del', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    console.log('Request widget del page...');
    Widget.findById(req.params.id).remove((err, data) => {
        res.redirect('/widgets');
    });
});

app.get('/widgets/:id.js', (req, res) => {
    res.send('File content will be here...'); // TODO
});
