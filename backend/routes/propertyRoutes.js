const express = require("express");
const router = express.Router();
const { createProperty, getAllProperties , getPropertyById } = require("../controller/propertyController");

// POST /properties
router.post("/properties", createProperty);
router.get("/properties", getAllProperties);
router.get("/properties/:id", getPropertyById);

module.exports = router;
