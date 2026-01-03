import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// GET all comments (Optional, for admin or display)
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new comment
router.post('/', async (req, res) => {
    try {
        const { nickname, restaurant, ratings, content } = req.body;

        // Basic backend validation
        if (!nickname || !restaurant || !content) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newComment = new Comment({
            nickname,
            restaurant,
            ratings,
            content
        });

        await newComment.save();
        res.status(201).json({ message: "Comment saved successfully", data: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
