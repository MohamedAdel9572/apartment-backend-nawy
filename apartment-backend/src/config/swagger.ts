import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Apartment Listing API',
      version: '1.0.0',
      description: 'API documentation for the Apartment Listing application',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Local development server',
      },
    ],
    components: {
      schemas: {
        Apartment: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              example: '123e4567-e89b-12d3-a456-426614174000',
            },
            unitName: {
              type: 'string',
              example: 'Apartment A1',
            },
            unitNumber: {
              type: 'string',
              example: '101',
            },
            project: {
              type: 'string',
              example: 'Sunshine Towers',
            },
            description: {
              type: 'string',
              example: 'A beautiful apartment with sea view.',
            },
          },
          required: ['unitName', 'unitNumber', 'project'],
        },

        SignupRequest: {
          type: 'object',
          required: ['username', 'password', 'role'],
          properties: {
            username: { type: 'string', example: 'johndoe' },
            password: { type: 'string', example: 'secret123' },
            role: { type: 'string', example: 'user' },
          },
        },

        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string', example: 'johndoe' },
            password: { type: 'string', example: 'secret123' },
          },
        },

        AuthResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'User created successfully' },
            error: { type: 'string', example: 'Signup failed' },
          },
        },
      },
    },
  },
  apis: ['./src/controllers/*.ts'],
};

export const swaggerSpecs = swaggerJSDoc(options);

/**
 * Function to attach Swagger UI to our Express app.
 */
export const setupSwagger = (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};
