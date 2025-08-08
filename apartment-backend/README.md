# Apartment Listing Backend API

This is the backend API for the Apartment Listing application. It is built with Node.js, TypeScript, Express, and uses SQL Server for the database. The API is fully documented using Swagger (OpenAPI 3.0).

---

## Features

- CRUD operations for apartments
- Authentication routes
- Structured with repository and service layers
- Integrated Swagger UI for API documentation and testing
- Environment configuration with dotenv
- CORS enabled for cross-origin requests

---

## Getting Started

### Prerequisites

- Node.js (>=14)
- npm
- SQL Server instance
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/apartment-backend.git
   cd apartment-backend

2. Install dependencies:
	npm install

3. Set up environment variables:

Create a .env file in the root directory with the following variables:

PORT=5000 (Change it if you want)
DB_HOST=your_sql_server_host
DB_PORT=1433
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_DATABASE=your_database_name

4. Configure your SQL Server and ensure it's accessible.

5. Run database migrations or initialization if applicable.

6. Start the server in development mode:
	npm run dev
