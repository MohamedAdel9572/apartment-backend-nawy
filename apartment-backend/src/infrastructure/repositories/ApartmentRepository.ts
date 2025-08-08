import { IApartmentRepository } from './IApartmentRepository';
import { AppDataSource } from '../../config/data-source';
import { Apartment } from '../model/Apartment';

export class ApartmentRepository implements IApartmentRepository {
  private repo = AppDataSource.getRepository(Apartment);

  async getAll(): Promise<Apartment[]> {
    return this.repo.find();
  }

  async getById(id: string): Promise<Apartment | null> {
    return this.repo.findOneBy({ id });
  }

  async create(apartment: Apartment): Promise<Apartment> {
    return this.repo.save(apartment);
  }

  async delete(id : string): Promise<boolean>{
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
