import { app, passport, errStr } from  './init';


app.get('/', (req, res) => {
    let error = req.flash('error');
    res.render('index', {
        username : req.user ? req.user.username : null,
        error : error.length ? error.join(' ') : null
    });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/widgets',
    failureRedirect: '/',
    failureFlash: errStr
}));

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.get('/widgets', (req, res) => {
    if (!req.user) {
        res.redirect('/');
    }
    res.render('widgets.pug', {
        username : req.user.username
    });
});
