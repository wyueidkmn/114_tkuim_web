import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    nickname: { type: String, required: true },
    restaurant: { type: String, required: true }, // Store restaurant name or ID
    ratings: {
        service: { type: Number, default: 0 },
        environment: { type: Number, default: 0 },
        food: { type: Number, default: 0 }
    },
    content: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
