import mongoose from "mongoose";

const Schema = mongoose.Schema;

const WidgetSchema = new Schema({
    city  : { type: String, required: true },
    days  : { type: Number, enum: [1, 3, 7] },
    vertical : { type: Boolean, default: false },
    user : { type: Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Widget', WidgetSchema);
