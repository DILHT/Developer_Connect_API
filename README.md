# DevConnect API

DevConnect is a collaborative portfolio and networking platform designed for developers. This RESTful API enables users to register, authenticate, update their profiles, add projects, search other developers by tech stack, and connect via email.

## 📌 Features

- ✅ User Registration & Login (JWT-based auth)
- 🔐 Protected Routes (middleware)
- 🧑‍💻 Profile Update (bio, skills, website, social links, image upload)
- 💼 Project Management (CRUD, image upload)
- 🔍 Search Users by Tech Stack
- 📬 Send Email for Collaboration
- 🌍 Public Developer Profiles
- 📄 API Documentation (Swagger)

---

## 🛠 Tech Stack

- **Node.js**
- **Express**
- **Sequelize + MySQL**
- **Multer** (for image uploads)
- **JWT** (Authentication)
- **Nodemailer** (Email)
- **Swagger** (API Docs)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository


```bash
git clone https://github.com/your-username/devconnect-api.git
cd devconnect-api ```

 ###2. Install Dependencies
      npm install

### 3. Configure Environment Variables
     Create a .env file in the root:
     PORT=5000

# Database config
DB_NAME=devconnect
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_PORT=3306

# JWT secret
JWT_SECRET=your_jwt_secret

# Email (Gmail SMTP)
SMTP_EMAIL=youremail@gmail.com
SMTP_PASSWORD=your_app_password

Use an App Password if using Gmail with 2FA.

### 4. Start the Server
      npm run dev

Server runs on: http://localhost:5000

📂 API Endpoints

| Method | Endpoint              | Description       |
| ------ | --------------------- | ----------------- |
| POST   | `/api/users/register` | Register new user |
| POST   | `/api/users/login`    | Login user        |

👤 User Profile
| Method | Endpoint                       | Description                             |
| ------ | ------------------------------ | --------------------------------------- |
| PUT    | `/api/users/profile`           | Update user profile (with image upload) |
| GET    | `/api/users/search?tech=react` | Search users by tech stack              |
| POST   | `/api/users/connect`           | Send connection email                   |
| GET    | `/api/users/public/:id`        | View public profile with projects       |

💼 Projects
| Method | Endpoint                   | Description                                |
| ------ | -------------------------- | ------------------------------------------ |
| POST   | `/api/projects/addProject` | Add a new project (image upload supported) |
| GET    | `/api/projects/myProjects` | Get user’s own projects                    |

📁 Folder Structure
    devconnect-api/
│
├── Controllers/
│   ├── User.auth.controller.js
│   ├── updateProfile.controller.js
│   ├── project.controller.js
│   └── email.controller.js
│
├── Models/
│   ├── user.model.js
│   └── project.model.js
│
├── Middlewares/
│   ├── auth.middlewire.js
│   └── upload.middleware.js
│
├── Routes/
│   ├── user.routes.js
│   └── project.routes.js
│
├── config/
│   ├── database.js
│   └── swagger.js
│
├── uploads/              ← Uploaded images
├── .env
├── server.js
└── README.md


🧪 Testing the API
Use Postman or Swagger at:

 http://localhost:5000/api-docs

📨 Test Email Feature
You can use this test payload for /api/users/connect:

  {
  "recipientEmail": "someone@example.com",
  "subject": "Let's Collaborate!",
  "message": "Hey, I came across your DevConnect profile and I’d love to collaborate with you!"
}


Make sure you're authenticated and have a valid JWT token in headers.

🔒 Security Notes
    Use HTTPS and production-ready JWT secrets

    Secure email with environment variables

    Add rate-limiting and input validation for production

🚀 Future Improvements
    Password reset via email

    Pagination & filtering

    Real-time notifications

    Follow system

    Comments & endorsements

👨‍💻 Author
Daniel Kasambala
📧 danielkasambala51@gmail.com

📃 License
MIT License