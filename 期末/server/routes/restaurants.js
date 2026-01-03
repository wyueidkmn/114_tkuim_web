import express from 'express';
import Restaurant from '../models/Restaurant.js';

const router = express.Router();

// GET all restaurants
router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Seed data (Initialize info from the old index.html)
router.post('/seed', async (req, res) => {
    try {
        await Restaurant.deleteMany({});
        const seedData = [
            { category: "臺式", name: "力霸椒麻雞", phone: "02-2620-0408", img: "assets/6.jpg", link: "https://www.google.com/maps/place/..." },
            { category: "臺式", name: "欣宏牛肉麵", phone: "02-2622-5205", img: "assets/5.jpg", link: "https://www.google.com/maps/place/..." },
            { category: "義式", name: "吃呼義料", phone: "02-2629-8046", img: "assets/9.jpg", link: "https://www.google.com/maps/place/..." },
            { category: "義式", name: "Eat窩", phone: "02-2620-3898", img: "assets/10.jpg", link: "https://www.google.com/maps/place/..." },
            { category: "日式", name: "領鮮平價日式料理", phone: "02-2620-1922", img: "assets/2.jpg", link: "https://www.google.com/maps/place/..." },
            { category: "日式", name: "迴味食光和風食堂", phone: "02-2628-1319", img: "assets/1.jpg", link: "https://www.google.com/maps/place/..." },
            { category: "港式", name: "珍寶港式燒臘", phone: "02-2620-3238", img: "assets/7.jpg", link: "https://www.google.com/maps/place/..." },
            { category: "港式", name: "滄州燒臘快餐", phone: "02-2623-3433", img: "assets/8.jpg", link: "https://www.google.com/maps/place/..." },
            { category: "美式", name: "FiFi Natural．義式香草漢堡", phone: "02-2625-6579", img: "assets/3.jpg", link: "https://www.google.com/maps/place/..." },
            { category: "美式", name: "The Peace Za 淡水手作披薩", phone: "02-2629-9661", img: "assets/4.jpg", link: "https://www.google.com/maps/place/..." }
        ];
        // Note: detailed links truncated for brevity in seed, but can be updated via Admin API if needed.
        // For this demo, let's try to restore the full links if possible, or just keep them functional.

        // Using full data based on user's HTML
        const fullData = [
            { category: "臺式", name: "力霸椒麻雞", phone: "02-2620-0408", img: "assets/6.jpg", link: "https://www.google.com/maps/search/?api=1&query=力霸椒麻雞" },
            { category: "臺式", name: "欣宏牛肉麵", phone: "02-2622-5205", img: "assets/5.jpg", link: "https://www.google.com/maps/search/?api=1&query=欣宏牛肉麵" },
            { category: "義式", name: "吃呼義料", phone: "02-2629-8046", img: "assets/9.jpg", link: "https://www.google.com/maps/search/?api=1&query=吃呼義料" },
            { category: "義式", name: "Eat窩", phone: "02-2620-3898", img: "assets/10.jpg", link: "https://www.google.com/maps/search/?api=1&query=Eat窩" },
            { category: "日式", name: "領鮮平價日式料理", phone: "02-2620-1922", img: "assets/2.jpg", link: "https://www.google.com/maps/search/?api=1&query=領鮮平價日式料理" },
            { category: "日式", name: "迴味食光和風食堂", phone: "02-2628-1319", img: "assets/1.jpg", link: "https://www.google.com/maps/search/?api=1&query=迴味食光和風食堂" },
            { category: "港式", name: "珍寶港式燒臘", phone: "02-2620-3238", img: "assets/7.jpg", link: "https://www.google.com/maps/search/?api=1&query=珍寶港式燒臘" },
            { category: "港式", name: "滄州燒臘快餐", phone: "02-2623-3433", img: "assets/8.jpg", link: "https://www.google.com/maps/search/?api=1&query=滄州燒臘快餐" },
            { category: "美式", name: "FiFi Natural．義式香草漢堡", phone: "02-2625-6579", img: "assets/3.jpg", link: "https://www.google.com/maps/search/?api=1&query=FiFi+Natural" },
            { category: "美式", name: "The Peace Za 淡水手作披薩", phone: "02-2629-9661", img: "assets/4.jpg", link: "https://www.google.com/maps/search/?api=1&query=The+Peace+Za" }
        ];

        await Restaurant.insertMany(fullData);
        res.json({ message: "Restaurants seeded successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
