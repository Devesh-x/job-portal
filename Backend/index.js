import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
// Allow all origins (enable CORS for everyone)
app.use(cors({
    origin: true, // Allow all origins
    credentials: true
}));

const PORT = process.env.PORT || 3000;

// api's
app.get("/api/v1/test", (req, res) => {
    res.json({ message: "Backend is working!", success: true });
});

app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);
 


app.listen(PORT,() => {
    connectDB();
    console.log(`server running at port ${PORT}`);
})