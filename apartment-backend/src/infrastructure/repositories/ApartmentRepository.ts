import { IApartmentRepository } from './IApartmentRepository';
import { Apartment } from "../../model/Apartment";
import { AppDataSource } from '../../config/data-source';

export class ApartmentRepository implements IApartmentRepository {
  private repo = AppDataSource.getRepository(Apartment);

  async getAll(): Promise<Apartment[]> {
    return this.repo.find();
  }

  async getById(id: number): Promise<Apartment | null> {
    return this.repo.findOneBy({ id });
  }

  async create(apartment: Apartment): Promise<Apartment> {
    return this.repo.save(apartment);
  }
}
