import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import homeRouter from "./routes/homeRouter.js";
import donationRouter from "./routes/donationRouter.js";
//import verifyJWT from "./middleware/auth.js";

dotenv.config();
const app = express();
app.use(cors());app.use(express.json());



//  MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB  Database connected"))
.catch(err => console.log("DB Error:", err));

// Middleware
app.use(bodyParser.json()); 
//app.use(verifyJWT);



// Routes
app.use("/api/user", userRouter);
app.use("/api/home", homeRouter);  
app.use("/api/donations", donationRouter);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
