import { User } from '../model/User';

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  create(user: User): Promise<User>;
}
