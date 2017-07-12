import express from "express";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import config from '../config.json';

const app = express();


app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);


app.set('view engine', 'pug');
app.set('views', path.resolve('server/views'));


passport.use(new LocalStrategy((username, password, done) => {
    return done(null, {
        username : username,
        id : 1
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


app.get('/', (req, res) => {
    res.render('index', {
        username : req.user ? req.user.username : null
    });
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/',
    //failureFlash: 'Invalid username or password.'
}));

const server = app.listen(config.serverPort, () => {
    console.log(`Server up at ${config.serverPort}...`);
});
