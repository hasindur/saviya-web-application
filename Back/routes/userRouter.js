import express from "express";
import { 
    saveUser, 
    loginUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from "../controller/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const userRouter = express.Router();

// Create a new user
userRouter.post("/", saveUser);

// User login
userRouter.post("/login", loginUser);

// Get all users
userRouter.get("/get-users", getAllUsers);
userRouter.get("/users", protect, getAllUsers);
userRouter.get("/users/:id", protect, getUserById);

// Get a single user by ID
userRouter.get("/users/:id", getUserById);

// Update a user by ID
userRouter.put("/users/:id", updateUser);

// Delete a user by ID
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
