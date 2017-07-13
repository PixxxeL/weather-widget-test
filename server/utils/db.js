import mongoose from "mongoose";

import config from '../../config.json';


export function connect() {
    mongoose.connect(
        `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`,
        { useMongoClient: true }
    );
}
