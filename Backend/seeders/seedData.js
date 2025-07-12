import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import { Application } from '../models/application.model.js';

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

// Dummy data
const dummyUsers = [
    {
        fullname: "John Doe",
        email: "john.doe@example.com",
        phoneNumber: 1234567890,
        password: "password123",
        role: "student",
        profile: {
            bio: "Full-stack developer with 3 years of experience",
            skills: ["JavaScript", "React", "Node.js", "MongoDB"],
            profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        fullname: "Jane Smith",
        email: "jane.smith@example.com",
        phoneNumber: 1234567891,
        password: "password123",
        role: "student",
        profile: {
            bio: "Frontend developer passionate about UI/UX",
            skills: ["React", "Vue.js", "CSS", "TypeScript"],
            profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b371?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        fullname: "Mike Johnson",
        email: "mike.johnson@example.com",
        phoneNumber: 1234567892,
        password: "password123",
        role: "student",
        profile: {
            bio: "Backend developer specializing in APIs",
            skills: ["Python", "Django", "PostgreSQL", "Docker"],
            profilePhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        fullname: "Sarah Wilson",
        email: "sarah.wilson@techcorp.com",
        phoneNumber: 1234567893,
        password: "password123",
        role: "recruiter",
        profile: {
            bio: "HR Manager at TechCorp Solutions",
            skills: ["Recruiting", "HR Management", "Team Building"],
            profilePhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    },
    {
        fullname: "David Brown",
        email: "david.brown@innovate.com",
        phoneNumber: 1234567894,
        password: "password123",
        role: "recruiter",
        profile: {
            bio: "Senior Recruiter at Innovate Inc",
            skills: ["Technical Recruiting", "Talent Acquisition"],
            profilePhoto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
        }
    }
];

const dummyCompanies = [
    {
        name: "TechCorp Solutions",
        description: "Leading software development company specializing in enterprise solutions",
        website: "https://techcorp.com",
        location: "San Francisco, CA",
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop"
    },
    {
        name: "Innovate Inc",
        description: "Innovative startup focused on AI and machine learning solutions",
        website: "https://innovate.com",
        location: "New York, NY",
        logo: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=200&h=200&fit=crop"
    },
    {
        name: "DataFlow Systems",
        description: "Big data analytics and cloud computing company",
        website: "https://dataflow.com",
        location: "Austin, TX",
        logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&h=200&fit=crop"
    },
    {
        name: "NextGen Digital",
        description: "Digital transformation consultancy for modern businesses",
        website: "https://nextgen.com",
        location: "Seattle, WA",
        logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop"
    },
    {
        name: "CodeCraft Studios",
        description: "Creative agency building modern web and mobile applications",
        website: "https://codecraft.com",
        location: "Los Angeles, CA",
        logo: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=200&fit=crop"
    }
];

const dummyJobs = [
    {
        title: "Senior Full Stack Developer",
        description: "We are looking for a Senior Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies. The ideal candidate should have experience with both frontend and backend development.",
        requirements: ["5+ years experience", "React.js", "Node.js", "MongoDB", "AWS"],
        salary: 120000,
        experienceLevel: 5,
        location: "San Francisco, CA",
        jobType: "Full-time",
        position: 2
    },
    {
        title: "Frontend Developer",
        description: "Join our team as a Frontend Developer and help us build amazing user experiences. You'll work with React, TypeScript, and modern CSS frameworks to create responsive and interactive web applications.",
        requirements: ["3+ years experience", "React.js", "TypeScript", "CSS3", "Git"],
        salary: 85000,
        experienceLevel: 3,
        location: "New York, NY",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Backend Developer",
        description: "We're seeking a Backend Developer to design and implement robust server-side applications. You'll work with Python, Django, and PostgreSQL to build scalable APIs and microservices.",
        requirements: ["4+ years experience", "Python", "Django", "PostgreSQL", "Docker"],
        salary: 95000,
        experienceLevel: 4,
        location: "Austin, TX",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Junior React Developer",
        description: "Perfect opportunity for a Junior React Developer to grow with our team. You'll work on exciting projects while learning from senior developers and contributing to our modern web applications.",
        requirements: ["1-2 years experience", "React.js", "JavaScript", "HTML/CSS", "Git"],
        salary: 60000,
        experienceLevel: 1,
        location: "Seattle, WA",
        jobType: "Full-time",
        position: 2
    },
    {
        title: "DevOps Engineer",
        description: "Looking for a DevOps Engineer to help streamline our development and deployment processes. You'll work with cloud platforms, containerization, and CI/CD pipelines.",
        requirements: ["3+ years experience", "AWS", "Docker", "Kubernetes", "Jenkins"],
        salary: 110000,
        experienceLevel: 3,
        location: "Los Angeles, CA",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "UI/UX Designer",
        description: "Creative UI/UX Designer needed to design intuitive and beautiful user interfaces. You'll work closely with developers to bring designs to life and ensure great user experiences.",
        requirements: ["2+ years experience", "Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
        salary: 75000,
        experienceLevel: 2,
        location: "San Francisco, CA",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Data Scientist",
        description: "Join our data team as a Data Scientist and help us derive insights from complex datasets. You'll work with machine learning algorithms and statistical analysis.",
        requirements: ["3+ years experience", "Python", "Machine Learning", "SQL", "Statistics"],
        salary: 105000,
        experienceLevel: 3,
        location: "New York, NY",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "Mobile App Developer",
        description: "We're looking for a Mobile App Developer to create cross-platform mobile applications. Experience with React Native or Flutter is preferred.",
        requirements: ["2+ years experience", "React Native", "JavaScript", "Mobile UI", "REST APIs"],
        salary: 80000,
        experienceLevel: 2,
        location: "Austin, TX",
        jobType: "Full-time",
        position: 2
    },
    {
        title: "Product Manager",
        description: "Experienced Product Manager needed to drive product strategy and roadmap. You'll work with cross-functional teams to deliver innovative products.",
        requirements: ["4+ years experience", "Product Strategy", "Agile", "User Research", "Analytics"],
        salary: 130000,
        experienceLevel: 4,
        location: "Seattle, WA",
        jobType: "Full-time",
        position: 1
    },
    {
        title: "QA Engineer",
        description: "Quality Assurance Engineer to ensure our products meet the highest standards. You'll design and execute test plans and work with automation tools.",
        requirements: ["2+ years experience", "Manual Testing", "Automation", "Selenium", "Test Planning"],
        salary: 70000,
        experienceLevel: 2,
        location: "Los Angeles, CA",
        jobType: "Full-time",
        position: 1
    }
];

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Company.deleteMany({});
        await Job.deleteMany({});
        await Application.deleteMany({});
        
        console.log('Cleared existing data');

        // Create users
        const hashedPassword = await bcrypt.hash('password123', 10);
        const usersWithHashedPassword = dummyUsers.map(user => ({
            ...user,
            password: hashedPassword
        }));

        const createdUsers = await User.insertMany(usersWithHashedPassword);
        console.log(`Created ${createdUsers.length} users`);

        // Get recruiter users
        const recruiterUsers = createdUsers.filter(user => user.role === 'recruiter');
        const studentUsers = createdUsers.filter(user => user.role === 'student');

        // Create companies
        const companiesWithUsers = dummyCompanies.map((company, index) => ({
            ...company,
            userId: recruiterUsers[index % recruiterUsers.length]._id
        }));

        const createdCompanies = await Company.insertMany(companiesWithUsers);
        console.log(`Created ${createdCompanies.length} companies`);

        // Create jobs
        const jobsWithCompanies = dummyJobs.map((job, index) => ({
            ...job,
            company: createdCompanies[index % createdCompanies.length]._id,
            created_by: recruiterUsers[index % recruiterUsers.length]._id
        }));

        const createdJobs = await Job.insertMany(jobsWithCompanies);
        console.log(`Created ${createdJobs.length} jobs`);

        // Create some applications
        const applications = [];
        for (let i = 0; i < 15; i++) {
            const randomJob = createdJobs[Math.floor(Math.random() * createdJobs.length)];
            const randomStudent = studentUsers[Math.floor(Math.random() * studentUsers.length)];
            const statuses = ['pending', 'accepted', 'rejected'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

            // Check if application already exists
            const existingApplication = applications.find(app => 
                app.job.toString() === randomJob._id.toString() && 
                app.applicant.toString() === randomStudent._id.toString()
            );

            if (!existingApplication) {
                applications.push({
                    job: randomJob._id,
                    applicant: randomStudent._id,
                    status: randomStatus
                });
            }
        }

        const createdApplications = await Application.insertMany(applications);
        console.log(`Created ${createdApplications.length} applications`);

        console.log('✅ Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`👥 Users: ${createdUsers.length}`);
        console.log(`🏢 Companies: ${createdCompanies.length}`);
        console.log(`💼 Jobs: ${createdJobs.length}`);
        console.log(`📋 Applications: ${createdApplications.length}`);

        console.log('\n🔐 Test Login Credentials:');
        console.log('Student: john.doe@example.com / password123');
        console.log('Recruiter: sarah.wilson@techcorp.com / password123');

    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        mongoose.connection.close();
    }
};

// Run the seeder
connectDB().then(() => {
    seedData();
});
