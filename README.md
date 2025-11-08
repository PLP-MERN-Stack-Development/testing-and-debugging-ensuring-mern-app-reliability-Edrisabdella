# 🧪 MERN Testing & Debugging Application

A comprehensive, production-ready MERN stack application with complete testing strategies and debugging implementations.

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-green)
![Testing](https://img.shields.io/badge/Testing-Complete-brightgreen)
![Coverage](https://img.shields.io/badge/Coverage-80%25%2B-success)

---

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

---

## 📁 Project Structure

mern-testing-debugging/
├── client/               # React Frontend Application
│   ├── public/           # Static assets (index.html, favicon, etc.)
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   │   ├── common/   # Shared UI elements (buttons, modals, etc.)
│   │   │   ├── layout/   # Navigation, header, footer, sidebar
│   │   │   └── pages/    # Page-level components (Home, Login, Dashboard)
│   │   ├── hooks/        # Custom React hooks (useAuth, useFetch)
│   │   ├── context/      # React Context API (AuthContext, ThemeContext)
│   │   ├── services/     # API handlers (Axios or Fetch wrappers)
│   │   ├── utils/        # Helper functions (formatters, validators)
│   │   ├── assets/       # Images, fonts, styles
│   │   ├── tests/        # Unit & integration tests (Jest / RTL)
│   │   ├── App.jsx       # Main React component
│   │   ├── index.js      # Entry point
│   │   └── setupTests.js # Jest / Testing Library setup
│   └── cypress/cpr       # End-to-End (E2E) tests
│       ├── e2e/          # E2E test specifications
│       ├── fixtures/     # Mock data for testing
│       ├── support/      # Cypress custom commands and config
│       └── cypr.config.js# Cypress configuration
│
├── server/               # Express Backend Application
│   ├── src/
│   │   ├── config/       # Environment & database configuration
│   │   ├── controllers/  # Route controllers (handle logic)
│   │   ├── models/       # Mongoose models (MongoDB schemas)
│   │   ├── routes/       # Express routes (API endpoints)
│   │   ├── middleware/   # Express middleware (auth, error handling)
│   │   ├── services/     # Business logic and database operations
│   │   ├── utils/        # Utility helpers (logging, formatting)
│   │   ├── validations/  # Joi / Yup request validations
│   │   ├── app.js        # Express app configuration
│   │   └── server.js     # Server startup (entry point)
│   └── tests/            # Backend unit & integration tests (Mocha / Jest)
│
├── coverage/             # Test coverage reports (generated automatically)
│   ├── client/           # Frontend coverage
│   └── server/           # Backend coverage
│
├── scripts/              # Deployment & maintenance scripts
│   ├── deploy.sh         # Deployment automation (CI/CD)
│   ├── seed.js           # Database seeding script
│   ├── backup-db.sh      # Database backup automation
│   └── lint-check.sh     # Linting & formatting check
│
├── .env                  # Environment variables (not committed)
├── .gitignore            # Git ignore rules
├── package.json          # Root project dependencies & scripts
├── README.md             # Project documentation

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v18 or higher)  
- MongoDB (v5 or higher)  
- npm or yarn

### Quick Start

```bash
git clone https://github.com/PLP-MERN-Stack-Development/testing-and-debugging-ensuring-mern-app-reliability-Edrisabdella.git
cd mern-testing-debugging
npm run install-all
cp .env.example .env
npm run setup-test-db
npm run dev
```

---

## 🧪 Testing Commands

```bash
npm test
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:coverage
npm run test:watch
```

---

## 🐛 Debugging Features

### Client-Side Debugging

```javascript
import { useDebug } from './hooks/useDebug';

const MyComponent = () => {
  const { debugInfo, logError } = useDebug('MyComponent');
  console.log('Debug Info:', debugInfo);
};
```

### Server-Side Debugging

```javascript
import logger from './utils/logger';

logger.info('User login successful', { userId: user.id });
logger.error('Database connection failed', error, { attempt: 3 });
```

---

## 📊 Test Coverage

| Metric | Target | Achieved |
|:-------|:--------|:----------|
| Statements | ≥ 80% | ✅ |
| Branches | ≥ 75% | ✅ |
| Functions | ≥ 80% | ✅ |
| Lines | ≥ 80% | ✅ |

Coverage Reports:  

- `coverage/server/index.html`  
- `coverage/client/index.html`  

---

## 🚀 Deployment

### Production Build

```bash
npm run build:prod
```

### Docker Deployment

```bash
docker-compose up -d
```

### Environment Variables

Refer to `.env.example` for required variables.

---

## 🔧 API Documentation

### Posts Endpoints

| Method | Endpoint | Description |
|:--------|:----------|:-------------|
| GET | `/api/posts` | Get all posts (with pagination/filtering) |
| GET | `/api/posts/:id` | Get single post |
| POST | `/api/posts` | Create new post (authenticated) |
| PUT | `/api/posts/:id` | Update post (author only) |
| DELETE | `/api/posts/:id` | Delete post (author only) |

### Authentication

| Method | Endpoint | Description |
|:--------|:----------|:-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |

---

## 🛡️ Security Features

- JWT-based authentication  
- Password hashing with bcrypt  
- Rate limiting (100 requests / 15 min)  
- Helmet.js security headers  
- CORS configuration  
- Input validation and sanitization  

---

## 📈 Performance

- MongoDB indexing for optimized queries  
- React component memoization  
- Asset compression  
- Efficient query and pagination  
- Lazy loading for components  

---

## 🤝 Contributing

```bash
# Fork the repository
# Create your branch
git checkout -b feature/AmazingFeature

# Commit your changes
git commit -m "Add AmazingFeature"

# Push your branch
git push origin feature/AmazingFeature

# Open a Pull Request
```

---

## 📝 License

This project is licensed under the **MIT License** — see the LICENSE file for details.

---

## 👨‍💻 Author

**Edris Abdella**  
📧 Email: [edrisabdella178@gmail.com](mailto:edrisabdella178@gmail.com)  
📱 Phone: +251905131051  
📍 Dire Dawa, Ethiopia  

---

## 🙏 Acknowledgments

- MERN Stack Community  
- Testing Library Team  
- Cypress Team  
- MongoDB for In-Memory Testing Support  

---

## ❤️ Built With

- ![JavaScript](https://img.shields.io/badge/JavaScript-ES6%252B-yellow)
- ![React](https://img.shields.io/badge/React-18.2-blue)
- ![Node.js](https://img.shields.io/badge/Node.js-18%252B-green)
- ![Express](https://img.shields.io/badge/Express-4.18-lightgrey)
- ![MongoDB](https://img.shields.io/badge/MongoDB-7.3-green)

---

## 🎯 Summary

This professional MERN Testing & Debugging project includes:

✅ Full MERN Stack Implementation (React + Express + MongoDB)  
✅ Unit, Integration & E2E Testing with Jest, Mocha, Cypress  
✅ Debugging Tools and Error Monitoring  
✅ Secure, Production-Ready Architecture  
✅ 80%+ Test Coverage Threshold  
✅ Docker Support and CI/CD Scripts  
✅ Complete Project Documentation

---

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)  
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)  
- [Supertest Documentation](https://github.com/visionmedia/supertest)  
- [Cypress Documentation](https://docs.cypress.io/)  
- [MongoDB Testing Best Practices](https://www.mongodb.com/blog/post/mongodb-testing-best-practices)
