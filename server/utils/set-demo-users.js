import md5 from 'md5';

import * as db from '../utils/db';
import User from '../models/User';


db.connect();

// У меня старая версия Монги и комп 32-битный,
// поэтому сделал в таком виде, а не update-upsert
const names = ['demo1','demo2'];
const pwd = md5('demo');
const users = names.map((n) => ({
    username : n,
    password : pwd
}));

User.remove(
    { username : { $in:names } },
    (err, data) => {
        User.insertMany(users, process.exit);
    }
);
