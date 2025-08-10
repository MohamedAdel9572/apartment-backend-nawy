import { Apartment } from "../../infrastructure/model/Apartment";
import { IApartmentRepository } from "../../infrastructure/repositories/IApartmentRepository";


/**
 * ApartmentService handles apartment-related business logic.
 */
export class ApartmentService {
  constructor(private readonly apartmentRepo: IApartmentRepository) {}

  /**
   * Get all apartments.
   * @returns Promise resolving to an array of Apartment objects.
   */
  async getAllApartments(): Promise<Apartment[]> {
    return this.apartmentRepo.getAll();
  }

  /**
   * Get a single apartment by its ID.
   * @param id - The unique identifier of the apartment.
   * @returns Promise resolving to an Apartment object or null if not found.
   */
  async getApartmentById(id: string): Promise<Apartment | null> {
    return this.apartmentRepo.getById(id);
  }

  /**
   * Create a new apartment.
   * @param data - Apartment object containing the data to create.
   * @returns Promise resolving to the created Apartment object.
   */
  async createApartment(data: Apartment): Promise<Apartment> {
    // Add business logic/validation here if needed
    return this.apartmentRepo.create(data);
  }

  /**
   * Delete an apartment by its ID.
   * @param id - The unique identifier of the apartment to delete.
   * @returns Promise resolving to a boolean indicating success.
   */
  async deleteApartment(id: string): Promise<boolean> {
    return this.apartmentRepo.delete(id);
  }
}

