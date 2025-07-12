import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

const additionalJobs = [
    {
        title: "Senior React Developer",
        description: "Looking for an experienced React developer to lead our frontend team. You'll be responsible for architecting scalable React applications, mentoring junior developers, and implementing best practices.",
        requirements: ["5+ years React", "TypeScript", "Redux/Context API", "Team Leadership", "Testing"],
        salary: 115000,
        experienceLevel: 5,
        location: "Remote",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Node.js Backend Engineer",
        description: "Join our backend team to build robust APIs and microservices. You'll work with Node.js, Express, and modern database technologies to create scalable server-side solutions.",
        requirements: ["4+ years Node.js", "Express.js", "MongoDB/PostgreSQL", "Microservices", "AWS"],
        salary: 100000,
        experienceLevel: 4,
        location: "San Francisco, CA",
        jobType: "Full-time",
        position: 2
    },
    {
        title: "DevOps/Cloud Engineer",
        description: "Help us scale our infrastructure and deployment processes. You'll work with AWS, Docker, Kubernetes, and CI/CD pipelines to ensure reliable and efficient deployments.",
        requirements: ["3+ years DevOps", "AWS/Azure", "Docker", "Kubernetes", "Terraform"],
        salary: 125000,
        experienceLevel: 3,
        location: "Seattle, WA",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Python Data Engineer",
        description: "Build and maintain data pipelines and analytics infrastructure. You'll work with large datasets, ETL processes, and data visualization tools.",
        requirements: ["3+ years Python", "Pandas", "SQL", "ETL", "Data Warehousing"],
        salary: 95000,
        experienceLevel: 3,
        location: "New York, NY",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Frontend Intern",
        description: "Great opportunity for students to gain hands-on experience with modern frontend technologies. You'll work on real projects while learning from experienced developers.",
        requirements: ["HTML/CSS", "JavaScript", "React basics", "Git", "Learning mindset"],
        salary: 35000,
        experienceLevel: 0,
        location: "Austin, TX",
        jobType: "Internship",
        position: 3
    },
    {
        title: "Cybersecurity Analyst",
        description: "Protect our systems and data from security threats. You'll monitor security events, conduct vulnerability assessments, and implement security measures.",
        requirements: ["2+ years Security", "Network Security", "Penetration Testing", "Risk Assessment", "Compliance"],
        salary: 90000,
        experienceLevel: 2,
        location: "Washington, DC",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Machine Learning Engineer",
        description: "Apply machine learning techniques to solve complex business problems. You'll build and deploy ML models, work with large datasets, and collaborate with data scientists.",
        requirements: ["ML/AI", "Python", "TensorFlow/PyTorch", "Statistics", "Cloud Platforms"],
        salary: 135000,
        experienceLevel: 4,
        location: "San Francisco, CA",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "iOS Developer",
        description: "Create amazing mobile experiences for iOS users. You'll develop native iOS applications using Swift and work closely with designers and product managers.",
        requirements: ["3+ years iOS", "Swift", "Xcode", "App Store", "Mobile UI/UX"],
        salary: 105000,
        experienceLevel: 3,
        location: "Los Angeles, CA",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Technical Writer",
        description: "Create clear and comprehensive technical documentation. You'll work with engineers to document APIs, write user guides, and maintain knowledge bases.",
        requirements: ["Technical Writing", "API Documentation", "Markdown", "Git", "Communication"],
        salary: 70000,
        experienceLevel: 2,
        location: "Remote",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Sales Engineer",
        description: "Bridge the gap between technical solutions and customer needs. You'll demonstrate products, support sales teams, and work with prospects to design solutions.",
        requirements: ["Technical Background", "Sales Experience", "Communication", "Demos", "CRM"],
        salary: 110000,
        experienceLevel: 3,
        location: "Boston, MA",
        jobType: "Full-time",
        position: 2
    }
];

const addMoreJobs = async () => {
    try {
        // Get existing companies and recruiters
        const companies = await Company.find();
        const recruiters = await User.find({ role: 'recruiter' });

        if (companies.length === 0 || recruiters.length === 0) {
            console.log('❌ No companies or recruiters found. Please run the main seeder first: npm run seed');
            return;
        }

        // Create jobs with random companies and recruiters
        const jobsWithCompanies = additionalJobs.map((job, index) => ({
            ...job,
            company: companies[index % companies.length]._id,
            created_by: recruiters[index % recruiters.length]._id
        }));

        const createdJobs = await Job.insertMany(jobsWithCompanies);
        console.log(`✅ Added ${createdJobs.length} more jobs to the database!`);

        // Show total jobs count
        const totalJobs = await Job.countDocuments();
        console.log(`📊 Total jobs in database: ${totalJobs}`);

        console.log('\n🆕 Newly Added Jobs:');
        createdJobs.forEach((job, index) => {
            console.log(`${index + 1}. ${job.title} - $${job.salary.toLocaleString()}`);
        });

    } catch (error) {
        console.error('Error adding more jobs:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the script
connectDB().then(() => {
    addMoreJobs();
});
