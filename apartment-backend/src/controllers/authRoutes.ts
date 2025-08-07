import express from 'express';
import { AppDataSource } from '../config/data-source';
import bcrypt from 'bcryptjs';
import { User } from '../model/User';

const router = express.Router();
const userRepo = AppDataSource.getRepository(User);

// POST /auth/signup
router.post('/signup', async (request, response) => {
  const { username, password, role } = request.body;

  try {
    const existingUser = await userRepo.findOneBy({ username });
    if (existingUser) {
      return response.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds
    const user = userRepo.create({ username, password: hashedPassword, role });
    await userRepo.save(user);

    response.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    response.status(500).json({ error: 'Signup failed' });
  }
});

// POST /auth/login
router.post('/login', async (request, response) => {
  const { username, password } = request.body;

  try {
    const user = await userRepo.findOneBy({ username });
    if (!user) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }
     response.json({ message: 'Login successful' });
  } catch (err) {
    response.status(500).json({ error: 'Login failed' });
  }
});

export default router;
