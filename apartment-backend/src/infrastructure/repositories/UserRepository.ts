import { IUserRepository } from './IUserRepository';
import { User } from '../model/User';
import { AppDataSource } from '../../config/data-source';

export class UserRepository implements IUserRepository {
  private userRepo = AppDataSource.getRepository(User);

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepo.findOneBy({ username });
  }

  async create(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }
}
