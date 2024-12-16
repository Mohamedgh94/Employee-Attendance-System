import express from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findByEmail(email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const validPassword = await UserModel.validatePassword(user, password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { ...user, password: undefined } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await UserModel.create(req.body);
    res.status(201).json({ ...user, password: undefined });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;