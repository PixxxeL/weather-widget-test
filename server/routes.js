import { app, passport, errStr } from  './init';
import { Widget, CITY_MAPPING, DAYS_CHOISES } from './models/Widget';


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
            widgets : widgets || []
        });
    });
});

app.get('/widgets/add', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    console.log('Request widget add page...');
    res.render('widgets/add.pug', {
        user : req.user,
        cities : CITY_MAPPING,
        days : DAYS_CHOISES,
        mode : 'Добавить'
    });
});


app.post('/widgets/add', (req, res) => {
    if (!req.user) {
        return res.redirect('/');
    }
    console.log('Request widget create page...');
    let widget = req.body;
    widget.user = req.user;
    Widget.create(widget, function (err, data) {
        if (!err) {
            return res.redirect('/widgets');
        }
    });
    res.render('widgets/add.pug', {
        user : req.user,
        widget : widget,
        cities : CITY_MAPPING,
        days : DAYS_CHOISES,
        mode : 'Добавить'
    });
});
