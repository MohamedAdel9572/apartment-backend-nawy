import { Apartment } from "../../model/Apartment";

export interface IApartmentRepository {
  getAll(): Promise<Apartment[]>;
  getById(id: number): Promise<Apartment | null>;
  create(apartment: Apartment): Promise<Apartment>;
}