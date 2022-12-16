const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

// Retrieve all contacts
router.get("/", contactController.findAll);

// Create a new contact
router.post('/', contactController.create);

// Retrieve a single contact with id
router.get("/:id", contactController.findById);

// Update a contact with id
router.put('/:id', contactController.update);

// Delete a contact with id
router.delete("/:id", contactController.delete);

module.exports = router;