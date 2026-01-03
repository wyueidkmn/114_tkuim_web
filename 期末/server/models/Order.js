import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    tableNumber: { type: String, required: true },
    items: [{
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        name: String, // Snapshot of name
        price: Number, // Snapshot of price
        quantity: { type: Number, required: true, default: 1 }
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'preparing', 'completed', 'cancelled'],
        default: 'pending'
    },
    note: { type: String }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
