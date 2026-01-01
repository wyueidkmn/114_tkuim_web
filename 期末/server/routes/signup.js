import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import * as repo from '../repositories/participants.js';


const router = express.Router();
router.use(authMiddleware);


router.get('/', async (req, res) => {
const data = req.user.role === 'admin'
? await repo.findAll()
: await repo.findByOwner(req.user.id);


res.json({ total: data.length, data });
});


router.post('/', async (req, res) => {
await repo.createParticipant({
...req.body,
ownerId: req.user.id
});
res.json({ message: '建立成功' });
});


router.delete('/:id', async (req, res) => {
const doc = await repo.findById(req.params.id);


if (!doc) return res.status(404).json({ error: '找不到資料' });
if (doc.ownerId !== req.user.id && req.user.role !== 'admin') {
return res.status(403).json({ error: '權限不足' });
}


await repo.deleteById(req.params.id);
res.json({ message: '刪除完成' });
});


export default router;