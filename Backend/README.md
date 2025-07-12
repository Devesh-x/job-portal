# Job Portal Backend API

A comprehensive job portal backend built with Node.js, Express, and MongoDB. This API provides endpoints for job seekers and recruiters to manage job applications, company profiles, and user authentication.

## 🚀 Features

- **User Authentication** - JWT-based authentication for students and recruiters
- **Job Management** - Create, read, update, and delete job listings
- **Company Management** - Manage company profiles and information
- **Application System** - Apply for jobs and track application status
- **File Upload** - Resume and profile photo upload support
- **Role-based Access** - Different permissions for students vs recruiters

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/jobportal
   PORT=3000
   JWT_SECRET=your-jwt-secret-key
   COOKIE_SECRET=your-cookie-secret
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔐 Test Credentials

The database comes pre-populated with test data. Use these credentials to test the application:

### 👨‍🎓 Student Accounts (Job Seekers)
| Email | Password | Profile |
|-------|----------|---------|
| `john.doe@example.com` | `password123` | Full-stack developer with React/Node.js skills |
| `jane.smith@example.com` | `password123` | Frontend developer with React/Vue.js skills |
| `mike.johnson@example.com` | `password123` | Backend developer with Python/Django skills |

### 👩‍💼 Recruiter Accounts (Job Posters)
| Email | Password | Company |
|-------|----------|---------|
| `sarah.wilson@techcorp.com` | `password123` | TechCorp Solutions |
| `david.brown@innovate.com` | `password123` | Innovate Inc |

## 📊 Database Overview

The application includes the following sample data:
- **👥 5 Users** (3 students + 2 recruiters)
- **🏢 5 Companies** (TechCorp, Innovate Inc, DataFlow, NextGen Digital, CodeCraft)
- **💼 12 Jobs** (Various roles from intern to senior level)
- **📋 9 Applications** (Mixed statuses: pending, accepted, rejected)

## 🛠️ API Endpoints

### Authentication
- `POST /api/v1/user/register` - Register a new user
- `POST /api/v1/user/login` - User login
- `POST /api/v1/user/logout` - User logout
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile/update` - Update user profile

### Companies
- `GET /api/v1/company` - Get all companies
- `POST /api/v1/company/register` - Register a new company
- `GET /api/v1/company/:id` - Get company by ID
- `PUT /api/v1/company/:id` - Update company

### Jobs
- `GET /api/v1/job` - Get all jobs
- `POST /api/v1/job/post` - Create a new job
- `GET /api/v1/job/:id` - Get job by ID
- `GET /api/v1/job/admin` - Get jobs created by recruiter

### Applications
- `POST /api/v1/application/apply/:id` - Apply for a job
- `GET /api/v1/application` - Get user's applications
- `GET /api/v1/application/:id/applicants` - Get job applicants
- `PUT /api/v1/application/status/:id` - Update application status

## 🗂️ Project Structure

```
Backend/
├── controllers/        # Route handlers
├── middlewares/       # Authentication & other middleware
├── models/           # Database models
├── routes/           # API routes
├── utils/            # Utility functions
├── seeders/          # Database seeding scripts
├── .env              # Environment variables
├── index.js          # Main application file
└── package.json      # Dependencies
```

## 🎯 Testing Features

### As a Student:
1. **Register/Login** with student credentials
2. **Browse Jobs** - View available job listings
3. **Apply for Jobs** - Submit applications
4. **Track Applications** - Check application status
5. **Update Profile** - Edit bio, skills, and upload resume

### As a Recruiter:
1. **Register/Login** with recruiter credentials
2. **Company Management** - Create and update company profile
3. **Job Posting** - Create new job listings
4. **Application Management** - Review and respond to applications
5. **Dashboard** - View company statistics

## 🔧 Development Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Seed database with dummy data
npm run seed

# Add more jobs to existing data
npm run seed:more
```

## 📱 API Testing

You can test the API using:
- **Postman** - Import the API collection
- **Thunder Client** (VS Code extension)
- **curl** commands

Example API call:
```bash
curl -X GET http://localhost:3000/api/v1/test
```

## 🚀 Deployment

1. **Environment Variables** - Set up production environment variables
2. **Database** - Connect to production MongoDB instance
3. **Build** - No build step required for Node.js
4. **Start** - Use `npm start` for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For issues and questions:
- Check the console for error messages
- Verify environment variables are set correctly
- Ensure MongoDB is running
- Check API endpoints with the test credentials above

---

**Happy coding! 🎉**
