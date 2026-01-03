import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // e.g., 'main', 'appetizer', 'drink'
    imageUrl: { type: String, default: 'https://via.placeholder.com/150' },
    available: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('MenuItem', menuItemSchema);
