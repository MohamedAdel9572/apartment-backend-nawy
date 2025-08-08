import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import apartmentRoutes from './controllers/apartmentRoutes';
import authRoutes from './controllers/authRoutes';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { setupSwagger } from './config/swagger'; // Adjust the path if needed


// Load .env variables
dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all origins

// Middleware
app.use(express.json());

// Swagger docs route
setupSwagger(app);

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to SQL Server');

    // Routes
    app.use('/apartments', apartmentRoutes);
    app.use('/auth', authRoutes);

    // Read port from env or default to 3000
    const PORT = Number(process.env.PORT) || 3000;
    console.log(`Using PORT from .env: ${PORT}`);

    // Listen on all interfaces so mobile devices can connect
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('DB connection error:', error));
