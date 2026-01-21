# TaskFlow - Premium Task Management System

TaskFlow is a production-grade MERN stack application designed for seamless task management. It features a classy, elegant frontend with robust authentication and real-time task CRUD operations.

## 🚀 Features

- **Premium UI/UX**: Clean, modern design built with Tailwind CSS and Framer Motion for smooth interactions.
- **State-Based Routing**: Efficient navigation using Zustand for state management (no React Router).
- **Zod Validation**: Comprehensive client-side and server-side form validation.
- **JWT Authentication**: Secure user registration and login with persistent sessions.
- **Full CRUD**: Manage tasks with real-time updates, status tracking, and filtering.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Zustand, Framer Motion, React Hook Form, Lucide React.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (via Mongoose).
- **Security**: JWT (JSON Web Tokens), Bcrypt.js, CORS.

---

## 📦 Setting Up Locally

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd TaskFlow
```

### 2. Backend Setup
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```
Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../client
npm install
```
Start the client:
```bash
npm run dev
```

---

## 📖 API Documentation

### Auth Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Register a new user | Public |
| POST | `/api/auth/login` | Login user & get token | Public |
| PUT | `/api/auth/profile` | Update user profile | Private |

### Task Endpoints
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| GET | `/api/tasks` | Get all user's tasks | Private |
| POST | `/api/tasks` | Create a new task | Private |
| PUT | `/api/tasks/:id` | Update an existing task | Private |
| DELETE | `/api/tasks/:id` | Delete a task | Private |

---

## 📈 Scaling for Production

To scale the TaskFlow integration for a high-traffic production environment, I would implement the following strategies:

### 1. Backend & Infrastructure Scaling
- **Horizontal Scaling**: Use a Load Balancer (like Nginx or AWS ALB) to distribute traffic across multiple Node.js instances.
- **Microservices Architecture**: Separate the Auth service from the Task management service to allow independent scaling.
- **Database Optimization**: 
  - Implement **Indexing** on frequently searched fields (like `userId` and `status`).
  - Use **Read Replicas** for heavy GET operations.
  - Implement **Caching** (e.g., Redis) for frequently accessed user profiles or task counts.

### 2. Frontend Scaling & Optimization
- **Code Splitting**: Dynamically import views to reduce the initial bundle size.
- **CDN Deployment**: Serve the production build through a Global CDN (e.g., Cloudflare or Vercel) for lightning-fast asset delivery.
- **PWA Capabilities**: Enable service workers for offline support and faster subsequent loads.

### 3. Security & Monitoring
- **Rate Limiting**: Implement API rate limiting to prevent DDoS attacks and brute-force logins.
- **CI/CD Integration**: Automate testing and deployment pipelines to ensure stable releases.
- **Real-time Monitoring**: Use tools like Sentry for error tracking and Prometheus/Grafana for performance monitoring.

---

## 📄 License
Created by Aditya Bansal for the Frontend Developer Intern Assignment.
