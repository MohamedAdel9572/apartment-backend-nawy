import express from 'express';
import { ApartmentRepository } from '../infrastructure/repositories/ApartmentRepository';
import { ApartmentService } from '../application/apartment/ApartmentService';
import { Apartment } from '../infrastructure/model/Apartment';

const router = express.Router();

// Dependency injection: we create instances of repo and service
const apartmentRepository = new ApartmentRepository();
const apartmentService = new ApartmentService(apartmentRepository);

/**
 * @swagger
 * tags:
 *   name: Apartments
 *   description: Apartment management API
 */

/**
 * GET /apartments
 * @swagger
 * /apartments:
 *   get:
 *     summary: Retrieve all apartments
 *     tags: [Apartments]
 *     responses:
 *       200:
 *         description: List of apartments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/infrastructure/model/Apartment'
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const apartments = await apartmentService.getAllApartments();
    res.json(apartments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch apartments' });
  }
});

/**
 * GET /apartments/{id}
 * @swagger
 * /apartments/{id}:
 *   get:
 *     summary: Retrieve an apartment by ID
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The apartment ID
 *     responses:
 *       200:
 *         description: Apartment object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/infrastructure/model/Apartment'
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  const id = req.params.id;
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

/**
 * POST /apartments
 * @swagger
 * /apartments:
 *   post:
 *     summary: Create a new apartment
 *     tags: [Apartments]
 *     requestBody:
 *       description: Apartment object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/infrastructure/model/Apartment'
 *     responses:
 *       201:
 *         description: Apartment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/infrastructure/model/Apartment'
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  const data = req.body as Apartment;
  try {
    const created = await apartmentService.createApartment(data);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: 'Error creating apartment' });
  }
});

/**
 * DELETE /apartments/{id}
 * @swagger
 * /apartments/{id}:
 *   delete:
 *     summary: Delete an apartment by ID
 *     tags: [Apartments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The apartment ID
 *     responses:
 *       200:
 *         description: Apartment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Apartment deleted successfully
 *       404:
 *         description: Apartment not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await apartmentService.deleteApartment(id);

    if (deleted) {
      res.json({ message: 'Apartment deleted successfully' });
    } else {
      res.status(404).json({ error: 'Apartment not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error deleting apartment' });
  }
});

export default router;
