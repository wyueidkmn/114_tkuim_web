import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

// GET all menu items
router.get('/', async (req, res) => {
    try {
        const menu = await MenuItem.find({ available: true });
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST to create a menu item (Admin)
router.post('/', async (req, res) => {
    try {
        const item = new MenuItem(req.body);
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// SEED endpoint (Quick setup)
router.post('/seed', async (req, res) => {
    try {
        await MenuItem.deleteMany({});
        const items = [
            { name: "經典牛肉漢堡", price: 180, category: "main", description: "多汁牛肉排配上特製醬料", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500" },
            { name: "松露野菇燉飯", price: 220, category: "main", description: "義大利米與頂級松露油的完美結合", imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500" },
            { name: "凱薩沙拉", price: 150, category: "appetizer", description: "新鮮羅美生菜佐帕馬森起司", imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=500" },
            { name: "美式炸薯條", price: 80, category: "appetizer", description: "酥脆金黃，附塔塔醬", imageUrl: "https://images.unsplash.com/photo-1630384060421-cb90d66a76b8?w=500" },
            { name: "可口可樂", price: 50, category: "drink", description: "冰涼暢快", imageUrl: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500" },
            { name: "特調檸檬紅茶", price: 60, category: "drink", description: "手工熬煮紅茶配新鮮檸檬", imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500" }
        ];
        await MenuItem.insertMany(items);
        res.json({ message: "Menu seeded successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
