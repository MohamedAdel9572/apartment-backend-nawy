import express from 'express';
import { UserRepository } from '../infrastructure/repositories/UserRepository';
import { UserService } from '../application/authentication/UserService';

const router = express.Router();

// Dependency Injection
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SignupRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - role
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *         password:
 *           type: string
 *           example: secret123
 *         role:
 *           type: string
 *           example: user
 *     LoginRequest:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           example: johndoe
 *         password:
 *           type: string
 *           example: secret123
 *     AuthResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: User created successfully
 *         error:
 *           type: string
 *           example: Signup failed
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       description: User signup data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/infrastructure/model/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/infrastructure/model/User'
 *       409:
 *         description: Username already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Username already exists
 *       500:
 *         description: Signup failed
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/infrastructure/model/User'
 */
router.post('/signup', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await userService.signup(username, password, role);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err: any) {
    if (err.message === 'Username already exists') {
      res.status(409).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Signup failed' });
    }
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       description: User login data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/infrastructure/model/User'
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid credentials
 *       500:
 *         description: Login failed
 *         content:
 *           application/json:
 *             schema:
 *             $ref: '#/components/infrastructure/model/User'
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Assume userService.login returns the token string if login succeeds
    const token = await userService.login(username, password);
    res.json({ message: 'Login successful', token });  // <-- return token here
  } catch (err: any) {
    if (err.message === 'Invalid credentials') {
      res.status(401).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Login failed' });
    }
  }
});
export default router;
