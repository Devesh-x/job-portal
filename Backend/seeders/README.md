# Database Seeder

This directory contains scripts to populate the job portal database with dummy data for testing and development.

## How to Use

1. **Run the seeder:**
   ```bash
   npm run seed
   ```

2. **Clear and re-seed (if needed):**
   The seeder automatically clears existing data and creates fresh dummy data each time you run it.

## What Gets Created

### Users (5 total)
- **3 Students** (job seekers)
- **2 Recruiters** (job posters)

### Companies (5 total)
- TechCorp Solutions
- Innovate Inc
- DataFlow Systems
- NextGen Digital
- CodeCraft Studios

### Jobs (10 total)
- Senior Full Stack Developer ($120,000)
- Frontend Developer ($85,000)
- Backend Developer ($95,000)
- Junior React Developer ($60,000)
- DevOps Engineer ($110,000)
- UI/UX Designer ($75,000)
- Data Scientist ($105,000)
- Mobile App Developer ($80,000)
- Product Manager ($130,000)
- QA Engineer ($70,000)

### Applications (13 total)
- Random applications from students to various jobs
- Mixed status: pending, accepted, rejected

## Test Login Credentials

### Student Accounts
- **Email:** john.doe@example.com | **Password:** password123
- **Email:** jane.smith@example.com | **Password:** password123
- **Email:** mike.johnson@example.com | **Password:** password123

### Recruiter Accounts
- **Email:** sarah.wilson@techcorp.com | **Password:** password123
- **Email:** david.brown@innovate.com | **Password:** password123

## Features to Test

### As a Student:
- Browse and search jobs
- View job details
- Apply for jobs
- View application status
- Update profile

### As a Recruiter:
- Create and manage companies
- Post new jobs
- View job applications
- Accept/reject applications
- Manage company profile

## API Endpoints to Test

- `GET /api/v1/job` - Get all jobs
- `GET /api/v1/job/:id` - Get job by ID
- `GET /api/v1/company` - Get all companies
- `POST /api/v1/application/apply/:id` - Apply for a job
- `GET /api/v1/application/get` - Get user's applications

## Notes

- All profile photos and company logos use Unsplash images
- Job descriptions are realistic and varied
- Salary ranges are market-appropriate
- Skills and requirements match job roles
- Applications have random statuses for testing
