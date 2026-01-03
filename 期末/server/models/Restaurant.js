import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    img: { type: String },
    link: { type: String }
}, { timestamps: true });

export default mongoose.model('Restaurant', restaurantSchema);
