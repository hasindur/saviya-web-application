// routes/homeRouter.js
import express from 'express';
import {createHome, getHomes, getHomeById, updateHome, deleteHome} from '../controller/homeController.js';
import { protect, adminProtect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ✅ Routes for Home CRUD
router.post('/', adminProtect, createHome);           // Add new home (Admin only)
router.get('/', getHomes);                            // Get all homes (Public)
router.get('/:id', getHomeById);                      // Get single home by ID (Public)
router.put('/:id', adminProtect, updateHome);         // Update home details (Admin only)
router.delete('/:id', adminProtect, deleteHome);      // Delete home (Admin only)

export default router;
