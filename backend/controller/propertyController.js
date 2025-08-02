const Property = require("../model/PropertyModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir); // Absolute path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1691145203.jpg
  }
});

const upload = multer({ storage });

// Create a new property with image
exports.createProperty = [
  upload.single("image"), // field name should be "image"
  async (req, res) => {
    try {
      const { name, type, price, location, description } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

      const property = new Property({
        name,
        type,
        price,
        location,
        description,
        image: imageUrl
      });

      await property.save();
      res.status(201).json({ message: "Property created", data: property });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
];

// Get all properties
exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get property by ID
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
