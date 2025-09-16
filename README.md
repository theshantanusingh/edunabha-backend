Edunabha
# 📚 Digital Learning Backend

Backend service for the **Digital Learning Platform for Rural School Students in Nabha (SIH Project)**.  
Built with **Node.js, Express, and MongoDB**, optimized for scalability, offline-first support, and educational use cases.

---

## 🚀 Features
- RESTful API built with **Express.js**
- MongoDB database integration via **Mongoose**
- **Secure environment configuration** with dotenv
- **CORS & Helmet** for API security
- **Logging** with Morgan
- **Nodemon** for development hot-reloading
- Production-ready project structure

---

## 📂 Project Structure
```text
backend/
├── src/
│   ├── config/        # Database and app configs
│   ├── middleware/    # Custom middleware (logger, error handler)
│   ├── routes/        # Express routes
│   ├── utils/         # Helper utilities
│   ├── app.js         # Express app setup
│   └── server.js      # Entry point
├── .env               # Environment variables
├── .gitignore
├── package.json
└── README.md