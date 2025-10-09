// controllers/homeController.js
import Home from '../models/home.js';

// ✅ Create a new Home (Admin only - protected by middleware)
export const createHome = async (req, res) => {
    try {
        const { name, registrationNumber, type, location, contactNumber, email, picture, description } = req.body;

        // ✅ Validate required fields
        if (!name || !registrationNumber || !type || !location || !contactNumber || !email) {
            return res.status(400).json({ 
                message: "Missing required fields: name, registrationNumber, type, location, contactNumber, email" 
            });
        }

        // ✅ Validate organization type
        const validTypes = ['Animal Center', 'Elder Home', 'Child Home'];
        if (!validTypes.includes(type)) {
            return res.status(400).json({ 
                message: "Invalid type. Must be one of: Animal Center, Elder Home, Child Home" 
            });
        }

        // ✅ Check for existing registration number
        const existingHome = await Home.findOne({ registrationNumber });
        if (existingHome) {
            return res.status(400).json({ message: "Home with this registration number already exists" });
        }

        // ✅ Check for existing email
        const existingEmail = await Home.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Home with this email already exists" });
        }

        const home = new Home({
            name,
            registrationNumber,
            type,
            location,
            contactNumber,
            email,
            picture: picture || '',
            description: description || ''
        });

        const savedHome = await home.save();
        
        // ✅ Log admin action
        console.log(`Admin ${req.user.email} created new home: ${savedHome.name} (${savedHome.registrationNumber})`);
        
        res.status(201).json({
            message: "Beneficiary organization created successfully",
            data: savedHome
        });

    } catch (error) {
        console.error("Error creating home:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Get all Homes (Public)
export const getHomes = async (req, res) => {
    try {
        const homes = await Home.find();
        res.status(200).json(homes);
    } catch (error) {
        console.error("Error fetching homes:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Get single Home by ID (Public)
export const getHomeById = async (req, res) => {
    try {
        const home = await Home.findById(req.params.id);
        if (!home) {
            return res.status(404).json({ message: "Home not found" });
        }
        res.status(200).json(home);
    } catch (error) {
        console.error("Error fetching home:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Update Home (Admin only - protected by middleware)
export const updateHome = async (req, res) => {
    try {
        const { name, registrationNumber, type, location, contactNumber, email, picture, description } = req.body;

        // ✅ Validate organization type if provided
        if (type) {
            const validTypes = ['Animal Center', 'Elder Home', 'Child Home'];
            if (!validTypes.includes(type)) {
                return res.status(400).json({ 
                    message: "Invalid type. Must be one of: Animal Center, Elder Home, Child Home" 
                });
            }
        }

        // ✅ Check for existing registration number (if being updated)
        if (registrationNumber) {
            const existingHome = await Home.findOne({ 
                registrationNumber, 
                _id: { $ne: req.params.id } 
            });
            if (existingHome) {
                return res.status(400).json({ message: "Another home with this registration number already exists" });
            }
        }

        // ✅ Check for existing email (if being updated)
        if (email) {
            const existingEmail = await Home.findOne({ 
                email, 
                _id: { $ne: req.params.id } 
            });
            if (existingEmail) {
                return res.status(400).json({ message: "Another home with this email already exists" });
            }
        }

        const updatedHome = await Home.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedHome) {
            return res.status(404).json({ message: "Home not found" });
        }

        // ✅ Log admin action
        console.log(`Admin ${req.user.email} updated home: ${updatedHome.name} (${updatedHome.registrationNumber})`);

        res.status(200).json({
            message: "Beneficiary organization updated successfully",
            data: updatedHome
        });

    } catch (error) {
        console.error("Error updating home:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// ✅ Delete Home (Admin only - protected by middleware)
export const deleteHome = async (req, res) => {
    try {
        const deletedHome = await Home.findByIdAndDelete(req.params.id);
        if (!deletedHome) {
            return res.status(404).json({ message: "Home not found" });
        }

        // ✅ Log admin action
        console.log(`Admin ${req.user.email} deleted home: ${deletedHome.name} (${deletedHome.registrationNumber})`);

        res.status(200).json({ 
            message: "Beneficiary organization deleted successfully",
            data: deletedHome
        });
    } catch (error) {
        console.error("Error deleting home:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
