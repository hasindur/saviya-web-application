// models/Home.js
import mongoose from 'mongoose';

const homeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    registrationNumber: {     // unique registration number
        type: String,
        required: true,
        unique: true
    },
    type: {                   // e.g., Animal Center, Elder Home, Child Home
        type: String,
        required: true,
        enum: ['Animal Center', 'Elder Home', 'Child Home']
    },
    location: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        type: String,         // store image URL or path
        default: ''
    },
    description: {
        type: String,
        default: ''
    }
}, { timestamps: true });     // adds createdAt and updatedAt automatically

const Home = mongoose.model('Home', homeSchema);

export default Home;
