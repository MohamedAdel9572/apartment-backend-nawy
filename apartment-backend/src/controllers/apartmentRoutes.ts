import express from 'express';
import { ApartmentRepository } from '../infrastructure/repositories/ApartmentRepository';
import { ApartmentService } from '../application/apartment/ApartmentService';
import { Apartment } from '../model/Apartment';

const router = express.Router();

// Dependency injection
const apartmentRepository = new ApartmentRepository();
const apartmentService = new ApartmentService(apartmentRepository);

// GET /apartments
router.get('/', async (req, res) => {
  try {
    const apartments = await apartmentService.getAllApartments();
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch apartments' });
  }
});

// GET /apartments/:id
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const apartment = await apartmentService.getApartmentById(id);
    if (apartment) {
      res.json(apartment);
    } else {
      res.status(404).json({ error: 'Apartment not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching apartment' });
  }
});

// POST /apartments
router.post('/', async (req, res) => {
  const data = req.body as Apartment;
  try {
    const created = await apartmentService.createApartment(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Error creating apartment' });
  }
});

export default router;
