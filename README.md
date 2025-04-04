# Backend Authentication System

A secure authentication system built using **Node.js, Express, MongoDB, and JWT**. This system includes user registration, login, token-based authentication, and protected routes.

## Features
- User Registration (Sign-up)
- User Login (Sign-in)
- JWT-based Authentication
- Password Hashing using bcrypt
- Middleware for Protected Routes
- Logout Functionality
- Secure Cookie Handling
- MongoDB for Data Storage

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt.js
- **Middleware**: Cookie Parser, CORS

## Installation

### Clone the Repository
```sh
git clone https://github.com/vishalrathore8oct/backend-authentication-system.git
cd backend-authentication-system
```

### Install Dependencies
```sh
npm install
```

### Setup Environment Variables
Create a `.env` file in the root directory and add:
```
PORT=
MONOG_URI=
CORS_ORIGIN=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

SMTP_HOST= 
SMTP_PORT= 
SMTP_SECURE= 
SMTP_USER= 
SMTP_PASSWORD= 
SMTP_MAIL= 
```

### Run the Server
```sh
npm run dev
```
The server will run on `http://localhost:8000`

## API Endpoints
### **Authentication Routes**
- `POST /api/v1/auth/register` → Register a new user
- `POST /api/v1/auth/verifyEmail` → Login user and get token
- `POST /api/v1/auth/resendVerificationCode` → Logout user

## Usage
- Use **Postman** or any API testing tool to test the authentication system.
- Integrate this backend with a **React.js frontend** for a full-stack application.

## License
This project is licensed under the **MIT License**.

## Author
Developed by **Vishal Rathore**
- GitHub: [@vishalrathore8oct](https://github.com/vishalrathore8oct)
- LinkedIn: [Vishal Rathore](https://linkedin.com/in/vishalrathore8oct)

---
Feel free to modify and improve this README as needed!

