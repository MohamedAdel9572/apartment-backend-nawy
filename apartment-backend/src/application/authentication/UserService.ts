import { IUserRepository } from '../../infrastructure/repositories/IUserRepository';
import { User } from '../../infrastructure/model/User';
import bcrypt from 'bcryptjs';

export class UserService {
  constructor(private readonly userRepo: IUserRepository) {}

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

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.userRepo.findByUsername(username);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    return true;
  }
}
