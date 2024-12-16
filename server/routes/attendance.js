import express from 'express';
import { AttendanceModel } from '../models/attendance.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/check-in', authenticateToken, async (req, res) => {
  try {
    const { locationId } = req.body;
    const userId = req.user.id;
    const record = await AttendanceModel.create(userId, locationId);
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/check-out/:id', authenticateToken, async (req, res) => {
  try {
    const record = await AttendanceModel.update(req.params.id, new Date());
    res.json(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const records = await AttendanceModel.getByUser(req.params.userId);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/active', authenticateToken, async (req, res) => {
  try {
    const records = await AttendanceModel.getActive();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;