# Backend Authentication System

A secure authentication system built using **Node.js, Express, MongoDB, and JWT**. This system includes user registration, email verification, login, token-based authentication, and protected routes.

## Features
- User Registration (Sign-up) with Email Verification
- User Login (Sign-in)
- JWT-based Authentication
- Password Hashing using bcrypt
- Middleware for Protected Routes
- Logout Functionality
- Forgot Password and Reset Password
- Secure Cookie Handling
- MongoDB for Data Storage
- Google OAuth Integration

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt.js
- **Middleware**: Cookie Parser, CORS
- **Email Service**: Nodemailer

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
Create a `.env` file in the root directory and add the following variables:

```
PORT=
MONOG_URI=
CORS_ORIGIN=
NODE_ENV=


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


GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_OAUTH_URL=
GOOGLE_TOKEN_URL=
GOOGLE_JWKS_URL=
GOOGLE_REDIRECT_URI=
```

### Run the Server
For development:
```sh
npm run dev
```

For production:
```sh
npm start
```

The server will run on `http://localhost:<PORT>`.

## API Endpoints

### **Authentication Routes**
- `POST /api/v1/auth/register` → Register a new user
- `POST /api/v1/auth/verifyEmail` → Verify email with a verification code
- `POST /api/v1/auth/resendVerificationCode` → Resend email verification code
- `POST /api/v1/auth/login` → Login user and get tokens
- `POST /api/v1/auth/logout` → Logout user
- `POST /api/v1/auth/getUser` → Get user details (protected route)
- `POST /api/v1/auth/forgotPassword` → Request password reset
- `POST /api/v1/auth/resetPassword/:resetToken` → Reset password
- `GET /api/v1/auth/googleLogin` → Redirect to Google OAuth login
- `GET /api/v1/auth/googleCallback` → Handle Google OAuth callback


### **Health Check Routes**
- `GET /api/v1/health-check` → Check server health

## Usage
- Use **Postman** or any API testing tool to test the authentication system.
- Integrate this backend with a **React.js frontend** for a full-stack application.

## Folder Structure
```
src/
├── app.js
├── controllers/
│   ├── auth.controllers.js
│   └── healthCheck.controllers.js
├── db/
│   └── db.connection.js
├── middlewares/
│   ├── authenticate.middlewares.js
│   ├── errorHandler.middlewares.js
│   └── validator.middlewares.js
├── models/
│   └── user.models.js
├── routes/
│   ├── auth.routes.js
│   └── healthCheck.routes.js
├── utils/
│   ├── ApiError.js
│   ├── ApiResponse.js
│   ├── asyncHandler.js
│   ├── emailTemplates.js
│   └── sendEmail.js
├── validators/
│   └── user.validator.js
└── index.js
```

## License
This project is licensed under the **MIT License**.

## Author
Developed by **Vishal Rathore**
- GitHub: [@vishalrathore8oct](https://github.com/vishalrathore8oct)
- LinkedIn: [Vishal Rathore](https://linkedin.com/in/vishalrathore8oct)

---
Feel free to modify and improve this README as needed!