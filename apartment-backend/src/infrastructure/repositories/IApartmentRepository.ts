import { Apartment } from "../model/Apartment";

export interface IApartmentRepository {
  getAll(): Promise<Apartment[]>;
  getById(id: string): Promise<Apartment | null>;
  create(apartment: Apartment): Promise<Apartment>;
  delete(id: string): Promise<boolean>; 
}