import { IUserRepository } from '../../infrastructure/repositories/IUserRepository';
import { User } from '../../infrastructure/model/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserService {
  constructor(private readonly userRepo: IUserRepository) {}

  /**
   * Registers a new user by creating a hashed password and saving user data.
   * @param username - The username of the new user.
   * @param password - The plain text password of the new user.
   * @param role - The role assigned to the new user.
   * @returns The created User object.
   * @throws Error if the username already exists.
   */
  async signup(username: string, password: string, role: string): Promise<User> {
    const existingUser = await this.userRepo.findByUsername(username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User();
    newUser.username = username;
    newUser.password = hashedPassword;
    newUser.role = role;

    return this.userRepo.create(newUser);
  }

  /**
   * Authenticates a user by verifying username and password,
   * then generates a JWT token for session management.
   * @param username - The username of the user logging in.
   * @param password - The plain text password of the user.
   * @returns A JWT token string if authentication is successful.
   * @throws Error if credentials are invalid.
   */
  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role }, // payload
      process.env.JWT_SECRET || 'P@ssw0rd',                     // secret key
      { expiresIn: '1h' }                                        // options
    );

    return token;
  }
}
