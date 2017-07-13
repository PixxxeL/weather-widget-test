import { app, passport, errStr } from  './init';


app.get('/', (req, res) => {
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
        return res.redirect('/');
    }
    res.render('widgets.pug', {
        user : req.user,
        widgets : []
    });
});
