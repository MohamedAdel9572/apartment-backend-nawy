import { Apartment } from "../../infrastructure/model/Apartment";
import { IApartmentRepository } from "../../infrastructure/repositories/IApartmentRepository";


export class ApartmentService {
  constructor(private readonly apartmentRepo: IApartmentRepository) {}

  async getAllApartments(): Promise<Apartment[]> {
    return this.apartmentRepo.getAll();
  }

  async getApartmentById(id: string): Promise<Apartment | null> {
    return this.apartmentRepo.getById(id);
  }

  async createApartment(data: Apartment): Promise<Apartment> {
    // Add business logic/validation here if needed
    return this.apartmentRepo.create(data);
  }

  async deleteApartment(id: string): Promise<boolean> {
  return this.apartmentRepo.delete(id);
}
}
