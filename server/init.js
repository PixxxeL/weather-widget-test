import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import connectMongo from 'connect-mongo';
import mongoose from "mongoose";
import passport from 'passport';
import path from 'path';
import { Strategy as LocalStrategy } from 'passport-local';
import md5 from 'md5';

import config from '../config.json';
import * as db from './utils/db';
import User from './models/User';


const app = express();

db.connect();

const MongoStore = connectMongo(session);

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: config.secret,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'pug');
app.set('views', path.resolve('server/views'));

const errStr = 'Не правильное имя пользователя или пароль';

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: errStr });
        }
        if (md5(password) != user.password) {
            return done(null, false, { message: errStr });
        }
        return done(null, user);
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

export { app, passport, errStr };
