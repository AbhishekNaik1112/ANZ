# ANZ - Authentication and Authorization Microservices

## Project Overview

An implementation of authentication and authorization microservices built with:

- **Auth Service**: Django + DRF (REST API)
- **Token Service**: FastAPI for JWT operations
- **Frontend**: React + TypeScript 
- **Database**: PostgreSQL with SSL
- **Cache**: Redis for session management

## Key Technical Features

- **JWT Authentication**:
  - Access & Refresh tokens  
  - HS256 signed tokens
  - Redis session validation

- **Security**:
  - Password hashing with bcrypt
  - SSL database connections

- **Database**:
  - PostgreSQL user/permission storage
  - Redis for active session tracking
  - Connection pooling

- **Architecture**:
  - Microservice design
  - Docker containers
  - REST APIs

## Architecture Overview

ANZ follows a microservice architecture pattern with the following services:

### Auth Service (auth_api)
- Python
- Django + Django REST Framework
- PostgreSQL database
- Handles user management and authentication

### Token Service (token_service) 
- Python
- Dedicated JWT token operations
- Lightweight and independently scalable

### Frontend Service (frontend)
- React + TypeScript
- Communicates with backend services via API calls
- SPA with client-side routing

### Infrastructure
- Docker containers for each service
- Docker Compose for orchestration
- Nginx reverse proxy (in production setup)

## Getting Started

### Prerequisites

- Docker
- Python 3.x

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abhisheknaik1112/ANZ.git
cd ANZ
```

2. Set up environment variables:
Create `.env` files in:
- `auth_api/` (for Django)
- `token_service/` (for token service)
- `frontend/` (for React)

Sample `.env` for Django:
```env
# Database Configuration
POSTGRES_DB=
POSTGRES_USER=
# Aiven-generated password
POSTGRES_PASSWORD= 
POSTGRES_HOST=
POSTGRES_PORT=
# SSL connection required
POSTGRES_SSLMODE=

# Django Configuration
DJANGO_SECRET_KEY=
# Set to False in production
DEBUG=  

# Application Settings
# For token service
JWT_SECRET_KEY=
```

3. Build and run with Docker:
```bash
docker-compose up --build
```

### Development Setup

#### Backend
```bash
cd auth_api
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

#### Token Service
```bash
cd token_service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Admin Endpoints

- `GET /api/admin/users/` - List all users (admin only)
- `GET /api/admin/users/{id}/` - Get user details (admin only)

## Project Structure

```
ANZ/
├── auth_api/              # Django backend
│   ├── authentication/    # Auth app
│   ├── auth_api/          # Project config
│   ├── manage.py
│   └── ...
├── frontend/              # React frontend
│   ├── public/
│   ├── src/
│   └── ...
├── token_service/         # Token service
│   └── main.py
├── docker-compose.yaml    # Docker config
└── README.md              # This file
```

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
