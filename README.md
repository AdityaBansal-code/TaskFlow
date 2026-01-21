# TaskFlow 🚀

> A modern, secure task management application built with the MERN stack

TaskFlow is a full-stack web application that demonstrates enterprise-grade development practices with a clean, responsive UI and robust backend architecture. Perfect for managing personal or team tasks with real-time CRUD operations.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with bcrypt password hashing
- 📱 **Fully Responsive Design** - Mobile-first UI with drawer navigation, touch-optimized buttons
- 🎯 **Complete CRUD** - Create, read, update, and delete tasks
- 🔍 **Smart Filtering** - Search and filter tasks by status
- 🎨 **Modern UI** - Clean design with custom shadow effects and smooth animations
- 📊 **Dashboard Analytics** - Visual task statistics and progress tracking
- 🛡️ **Input Validation** - Client & server-side validation with Zod
- 🚀 **Performance Optimized** - Vite build system with 60fps animations
- 📱 **Touch Optimized** - Buttons visible on tap for mobile, hover for desktop
- 🎬 **Smooth Animations** - Professional transitions and drawer effects

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Hook Form + Zod** - Form handling and validation
- **Axios** - HTTP client with interceptors

### Backend
- **Node.js + Express** - Scalable REST API server
- **MongoDB + Mongoose** - NoSQL database with schema validation
- **JWT + bcryptjs** - Secure authentication and authorization
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18+) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - **Local**: Install MongoDB Community Server and run `mongod` on port 27017
  - **Cloud**: Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd TaskFlow
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```

   Create `.env` file in `server/` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskflow
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```
   
   ⚠️ **Important**: Add `.env` to `.gitignore` - never commit secrets!
   
   Verify MongoDB is running, then start the server:
   ```bash
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

### MongoDB Setup Guide

**Option 1: Local MongoDB**
```bash
# Windows: Download from https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: Follow MongoDB docs for your distro
# Then run: mongod
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/taskflow`
4. Paste into `MONGO_URI` in `.env`

## 📡 API Reference

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | User login |
| `PUT` | `/api/auth/profile` | Update user profile |

### Task Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/tasks` | Get user's tasks |
| `POST` | `/api/tasks` | Create new task |
| `PUT` | `/api/tasks/:id` | Update task |
| `DELETE` | `/api/tasks/:id` | Delete task |

### Testing with Postman

1. Import `TaskFlow_Postman_Collection.json` into Postman
2. Set `BASE_URL` variable to `http://localhost:5000`
3. Register/Login to get JWT token
4. Add token to `Authorization` header in other requests
5. Test all endpoints

### Example API Usage

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'

# Create task (requires auth token)
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Complete project","description":"Finish the TaskFlow app","status":"pending"}'
```

## 📊 Project Structure

```
TaskFlow/
├── client/                          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/             # Layout components (DashboardLayout, Sidebar, Navbar)
│   │   │   └── ui/                 # Reusable UI components (Button, Card, Input, etc)
│   │   ├── views/                  # Page components (Dashboard, Login, Register, Profile)
│   │   ├── services/               # API services (authServices, taskServices)
│   │   ├── store/                  # Zustand state management (authStore)
│   │   └── utils/                  # Helper functions (axiosInstance, cn)
│   ├── public/                      # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                          # Express backend
│   ├── controllers/                 # Route handlers (authController, taskController)
│   ├── models/                      # MongoDB schemas (User, Task)
│   ├── routes/                      # API routes (auth, tasks)
│   ├── middleware/                  # Auth & error handling (authMiddleware, errorHandler)
│   ├── config/                      # Database connection (db.js)
│   ├── server.js                    # Express server setup
│   ├── package.json
│   └── .env                         # Environment variables (NOT in git)
│
├── TaskFlow_Postman_Collection.json  # API testing collection
├── README.md
└── .gitignore
```

## 🔧 Development

### Available Scripts

```bash
# Frontend
cd client
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Run ESLint

# Backend
cd server
npm run dev      # Start with nodemon
npm start        # Production start
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGO_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `NODE_ENV` | Environment mode | `development` |

## 🎯 Key Highlights

### Security & Best Practices
- ✅ Password hashing with bcryptjs
- ✅ JWT token-based authentication
- ✅ Input sanitization and validation
- ✅ CORS configuration
- ✅ Error handling middleware
- ✅ Environment-based configuration

### Performance & UX
- ✅ **Fully responsive** design for all devices (375px - 1920px+)
- ✅ **Mobile drawer navigation** for easy access on small screens
- ✅ **Touch-optimized buttons** visible on tap for mobile
- ✅ **Desktop hover effects** for mouse users
- ✅ **60fps smooth animations** with no layout shift
- ✅ Optimized bundle size with Vite
- ✅ State persistence with Zustand
- ✅ Accessible form controls
- ✅ Loading states and error feedback

### Code Quality
- ✅ TypeScript-level tooling with ESLint
- ✅ Modular component architecture
- ✅ Separation of concerns
- ✅ Comprehensive error handling
- ✅ Clean, documented code

## 📈 Production Scaling Strategy

### Backend Scaling
- **Load Balancing**: Nginx/AWS ALB for traffic distribution
- **Database Indexing**: Optimized queries on userId and status fields
- **Caching**: Redis for session and frequently accessed data
- **Rate Limiting**: Prevent abuse and DDoS attacks

### Frontend Scaling
- **CDN Deployment**: Global content delivery (Vercel/Cloudflare)
- **Code Splitting**: Lazy loading for better performance
- **Service Workers**: Offline capability and caching
- **Bundle Optimization**: Tree shaking and minification

### Monitoring & Reliability
- **Error Tracking**: Sentry for real-time error monitoring
- **Performance Monitoring**: Core Web Vitals tracking
- **CI/CD Pipeline**: Automated testing and deployment
- **Health Checks**: API endpoint monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project was created for the Frontend Developer Intern Assignment at PrimeTrade.

## 📖 Additional Documentation

For responsive design details and mobile testing guidance, see:
- [Responsive Design Improvements](./RESPONSIVE_IMPROVEMENTS.md) - Technical implementation details
- [Mobile Testing Guide](./MOBILE_TESTING_GUIDE.md) - Testing procedures for mobile devices
- [Quick Reference](./QUICK_REFERENCE.md) - Quick lookup for responsive features

---

**Built with ❤️ using React, Node.js, and MongoDB**