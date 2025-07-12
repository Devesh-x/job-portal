# 🚀 Job Portal - Full Stack Application

A modern job portal built with React, Node.js, and MongoDB. Students can browse and apply for jobs, while recruiters can post jobs and manage applications.

<img width="1814" height="845" alt="Screenshot 2025-07-12 193536" src="https://github.com/user-attachments/assets/5dcb48cd-03ff-4e42-8dbc-a9ac957b5dbf" />

<img width="1727" height="855" alt="Screenshot 2025-07-12 193557" src="https://github.com/user-attachments/assets/03feb352-3b5b-475f-8577-add530c0ccd4" />


## 🛠️ Tech Stack

**Frontend**: React 19, Vite, Tailwind CSS, Redux Toolkit, Axios
**Backend**: Node.js, Express.js, MongoDB, JWT, Cloudinary

## 🔐 Test Credentials

### 👨‍🎓 Students
- **john.doe@example.com** | password123
- **jane.smith@example.com** | password123  
- **mike.johnson@example.com** | password123

### 👔 Recruiters
- **sarah.wilson@techcorp.com** | password123
- **david.brown@innovate.com** | password123

## 🎮 How to Test

### Student Features:
- Browse job listings
- Apply for jobs
- View application status
- Update profile & skills

### Recruiter Features:
- Manage company info
- Post new jobs
- Review applications
- Accept/reject candidates

## 🚀 Quick Start

```bash
# Frontend
cd Frontend
npm install
npm run dev

# Backend
cd Backend
npm install
npm run dev
```

## 🔧 Environment Variables

**Frontend (.env)**
```env
VITE_API_BASE_URL=https://job-portal-zzaq.onrender.com/api/v1
```

**Backend (.env)**
```env
PORT=8000
MONGO_URI=your-mongodb-connection-string
SECRET_KEY=your-jwt-secret
CLOUD_NAME=your-cloudinary-cloud-name
API_KEY=your-cloudinary-api-key
API_SECRET=your-cloudinary-api-secret
COOKIE_SECRET=your-cookie-secret
FRONTEND_URL=https://job-portal-kappa-peach.vercel.app
```

## 📁 Project Structure

```
job-portal/
├── Frontend/          # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── redux/        # State management
│   │   └── utils/        # Utility functions
└── Backend/           # Node.js backend
    ├── controllers/    # Route controllers
    ├── models/        # MongoDB models
    ├── routes/        # API routes
    └── utils/         # Utility functions
```

## 🚀 Deployment

- **Frontend**: Vercel (automatic deployment)
- **Backend**: Render (automatic deployment)

---

**Built with ❤️ using modern web technologies**
