import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Create new user
export function saveUser(req, res) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        role: req.body.role || "user",
    });

    user.save()
        .then(() => res.status(201).json({ message: "User saved successfully" }))
        .catch((error) => {
            console.error("Error saving user:", error);
            res.status(500).json({ message: "User not saved successfully" });
        });
}

// Login user and return JWT
export function loginUser(req, res) {
    console.log("Login request received:", req.body);
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) return res.status(404).json({ message: "User not found" });

            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

            const tokenPayload = {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isDisabled: user.isDisabled,
                isEmailVerified: user.isEmailVerified,
            };
            // Sign the token with a secret key and set an expiration time
            const token = jwt.sign(tokenPayload, "random456", { expiresIn: '1h' });
            console.log("Generated JWT:", token);
            return res.status(200).json({ message: "Login successful", token });
        })
        .catch((error) => {
            console.error("Error during login:", error);
            res.status(500).json({ message: "Internal server error" });
        });
}

// Get all users
export function getAllUsers(req, res) {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => {
            console.error("Error fetching users:", error);
            res.status(500).json({ message: "Failed to fetch users" });
        });
}

// Get a single user by ID
export function getUserById(req, res) {
    User.findById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: "User not found" });
            res.status(200).json(user);
        })
        .catch(error => {
            console.error("Error fetching user:", error);
            res.status(500).json({ message: "Failed to fetch user" });
        });
}

// Update user by ID
export function updateUser(req, res) {
    const updateData = { ...req.body };
    if (updateData.password) {
        updateData.password = bcrypt.hashSync(updateData.password, 10);
    }

    User.findByIdAndUpdate(req.params.id, updateData, { new: true })
        .then(user => {
            if (!user) return res.status(404).json({ message: "User not found" });
            res.status(200).json({ message: "User updated successfully", user });
        })
        .catch(error => {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Failed to update user" });
        });
}

// Delete user by ID
export function deleteUser(req, res) {
    User.findByIdAndDelete(req.params.id)
        .then(user => {
            if (!user) return res.status(404).json({ message: "User not found" });
            res.status(200).json({ message: "User deleted successfully" });
        })
        .catch(error => {
            console.error("Error deleting user:", error);
            res.status(500).json({ message: "Failed to delete user" });
        });
}
