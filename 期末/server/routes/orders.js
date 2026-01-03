import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// GET all orders (for Admin/Kitchen)
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST to create an order (Customer)
router.post('/', async (req, res) => {
    try {
        const { tableNumber, items, totalAmount, note } = req.body;
        const newOrder = new Order({
            tableNumber,
            items, // items should include menuItemId, name, price, quantity
            totalAmount,
            note
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH to update order status (Admin/Kitchen)
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
