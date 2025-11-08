# 🧪 MERN Testing & Debugging Application

A comprehensive, production-ready MERN stack application with complete testing strategies and debugging implementations.

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-green)
![Testing](https://img.shields.io/badge/Testing-Complete-brightgreen)
![Coverage](https://img.shields.io/badge/Coverage-80%25%2B-success)

## 🚀 Features

### 🧪 Comprehensive Testing

- **Unit Testing**: Component and utility function testing
- **Integration Testing**: API endpoints and database operations
- **E2E Testing**: Critical user flows with Cypress
- **Test Coverage**: 80%+ coverage threshold

### 🐛 Advanced Debugging

- Error boundaries for React components
- Structured logging system
- Performance monitoring
- Development debugging hooks

### 🛡️ Production Ready

- Security middleware (Helmet, CORS, Rate Limiting)
- Error handling and validation
- Environment-based configuration
- Graceful shutdown procedures

## 📁 Project Structure

## mern-testing-debugging/

├── client/                           # React Frontend Application
│   ├── public/                       # Static assets (index.html, favicon, etc.)
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── common/               # Shared UI elements (buttons, modals, etc.)
│   │   │   ├── layout/               # Navigation, header, footer, sidebar
│   │   │   └── pages/                # Page-level components (Home, Login, Dashboard)
│   │   ├── hooks/                    # Custom React hooks (e.g., useAuth, useFetch)
│   │   ├── context/                  # React Context API (AuthContext, ThemeContext)
│   │   ├── services/                 # API handlers (Axios or Fetch wrappers)
│   │   ├── utils/                    # Helper functions (formatters, validators)
│   │   ├── assets/                   # Images, fonts, styles
│   │   ├── tests/                    # Unit & integration tests (Jest / RTL)
│   │   ├── App.jsx                   # Main React component
│   │   ├── index.js                  # Entry point
│   │   └── setupTests.js             # Jest / Testing Library setup
│   └── cypress/                      # End-to-End (E2E) tests
│       ├── e2e/                      # E2E test specifications
│       ├── fixtures/                 # Mock data for testing
│       ├── support/                  # Cypress custom commands and config
│       └── cypress.config.js         # Cypress configuration
│
├── server/                           # Express Backend Application
│   ├── src/
│   │   ├── config/                   # Environment & database configuration
│   │   ├── controllers/              # Route controllers (handle logic)
│   │   ├── models/                   # Mongoose models (MongoDB schemas)
│   │   ├── routes/                   # Express routes (API endpoints)
│   │   ├── middleware/               # Express middleware (auth, error handling)
│   │   ├── services/                 # Business logic and database operations
│   │   ├── utils/                    # Utility helpers (logging, formatting)
│   │   ├── validations/              # Joi / Yup request validations
│   │   ├── app.js                    # Express app configuration
│   │   └── server.js                 # Server startup (entry point)
│   └── tests/                        # Backend unit & integration tests (Mocha / Jest)
│
├── coverage/                         # Test coverage reports (generated automatically)
│   ├── client/                       # Frontend coverage
│   └── server/                       # Backend coverage
│
├── scripts/                          # Deployment & maintenance scripts
│   ├── deploy.sh                     # Deployment automation (e.g., CI/CD)
│   ├── seed.js                       # Database seeding script
│   ├── backup-db.sh                  # Database backup automation
│   └── lint-check.sh                 # Linting & formatting check
│
├── .env                              # Environment variables (not committed)
├── .gitignore                        # Git ignore rules
├── package.json                      # Root project dependencies & scripts
├── README.md                         # Project documentation
└── docker-compose.yml                # Docker setup for full-stack development

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/PLP-MERN-Stack-Development/testing-and-debugging-ensuring-mern-app-reliability-Edrisabdella.git
   cd mern-testing-debugging

2. Install dependencies

bash
npm run install-all
3. Environment setup

bash
cp .env.example .env

# Edit .env with your configuration

4.Setup test database

bash
npm run setup-test-db
5. Start development servers

bash
npm run dev
🧪 Testing Commands
bash

# Run all tests

npm test

# Run specific test types

npm run test:unit          # Unit tests only
npm run test:integration   # Integration tests only
npm run test:e2e          # End-to-end tests

# Coverage reports

npm run test:coverage     # Generate coverage reports

# Watch mode

npm run test:watch        # Watch files for changes
🐛 Debugging Features
Client-Side Debugging
javascript
// Use the useDebug hook in any component
import { useDebug } from './hooks/useDebug';

const MyComponent = (props) => {
  const { debugInfo, logError } = useDebug('MyComponent');
  
  // Debug info is automatically tracked
  console.log('Debug Info:', debugInfo);
};
Server-Side Debugging
javascript
import logger from './utils/logger';

// Structured logging
logger.info('User login successful', { userId: user.id });
logger.error('Database connection failed', error, { attempt: 3 });
📊 Test Coverage
We maintain high test coverage standards:

Statements: 80%+

Branches: 75%+

Functions: 80%+

Lines: 80%+

View detailed coverage reports:

Server: coverage/server/index.html

Client: coverage/client/index.html

🚀 Deployment
Production Build
bash
npm run build:prod
Docker Deployment
bash
docker-compose up -d
Environment Variables
See .env.example for all required environment variables.

🔧 API Documentation
Posts Endpoints
GET /api/posts - Get all posts (with pagination and filtering)

GET /api/posts/:id - Get single post

POST /api/posts - Create new post (authenticated)

PUT /api/posts/:id - Update post (author only)

DELETE /api/posts/:id - Delete post (author only)

Authentication
POST /api/auth/register - User registration

POST /api/auth/login - User login

GET /api/auth/me - Get current user

🛡️ Security Features
JWT-based authentication

Password hashing with bcrypt

Rate limiting (100 requests/15min)

Helmet.js security headers

CORS configuration

Input validation and sanitization

📈 Performance
MongoDB indexing for optimal queries

React component optimization

Asset compression

Efficient database queries

Pagination for large datasets

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Edris Abdella

📧 Email: <edrisabdella178@gmail.com>

💼 LinkedIn: Edris Abdella

📱 Phone: +251905131051

📍 Location: Dire Dawa, Ethiopia

🙏 Acknowledgments
MERN Stack community

Testing Library team

Cypress team

MongoDB for in-memory testing support

Built with ❤️ using the MERN Stack

<https://img.shields.io/badge/JavaScript-ES6%252B-yellow>
<https://img.shields.io/badge/React-18.2-blue>
<https://img.shields.io/badge/Node.js-18%252B-green>
<https://img.shields.io/badge/Express-4.18-lightgrey>
<https://img.shields.io/badge/MongoDB-7.3-green>

</div> ```
🎯 Summary
I've created a comprehensive, professional MERN testing and debugging application that includes:

✅ Complete Implementation:
Full MERN Stack with React frontend and Express backend

Comprehensive Testing with Unit, Integration, and E2E tests

Advanced Debugging with error boundaries and logging

Production Features like security, validation, and error handling

✅ All Assignment Tasks Completed:
Testing Environment - Jest configuration for both client/server

Unit Testing - Components, utilities, hooks, middleware

Integration Testing - API endpoints with in-memory MongoDB

E2E Testing - Critical user flows with Cypress

Debugging Techniques - Error boundaries, logging, monitoring

✅ Professional Features:
80%+ test coverage threshold

Security middleware (Helmet, CORS, Rate Limiting)

Error handling and validation

Environment-based configuration

Performance optimization

Mobile responsiveness

Comprehensive documentation

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library Documentation](https://testing-library.com/docs/react-testing-library/intro/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Cypress Documentation](https://docs.cypress.io/)
- [MongoDB Testing Best Practices](https://www.mongodb.com/blog/post/mongodb-testing-best-practices)
