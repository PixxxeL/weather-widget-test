import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CITY_MAPPING = {
    'Москва' : 'Moskow',
    'Санкт-Петербург' : 'Saint Petersburg',
    'Нижний Новгород' : 'Nizhniy Novgorod'
};

const CITIES_CHOISES = Object.values(CITY_MAPPING);

const DAYS_CHOISES = [1, 3, 7];

const WidgetSchema = new Schema({
    city  : { type: String, enum: CITIES_CHOISES, required: true },
    days  : { type: Number, enum: DAYS_CHOISES, required: true },
    vertical : { type: Boolean, default: false },
    user : { type: Schema.Types.ObjectId, ref: 'User' }
});

const Widget = mongoose.model('Widget', WidgetSchema);

export { Widget, CITY_MAPPING, CITIES_CHOISES, DAYS_CHOISES };
