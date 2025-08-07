import express from 'express';
import { AppDataSource } from './config/data-source';
import apartmentRoutes from './controllers/apartmentRoutes';
import authRoutes from './controllers/authRoutes';

import 'reflect-metadata';

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to SQL Server');

    app.use('/apartments', apartmentRoutes); // <--- Wire route
    app.use('/auth', authRoutes);


    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.error('DB connection error:', error));
