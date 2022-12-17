const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");

// Retrieve all contacts
router.get("/", contactController.findAll);

// Retrieve users, sorted
router.get("/orderby/:orderby", contactController.findAllSorted);

// Retrieve users with a limit
router.get("/limit/:limit", contactController.findAllLimit);

// Retrieve users with a limit and offsset
router.get("/limit/:limit/:offset", contactController.findAllLimitOffset);

// Retrieve users with a searchterm on a specific field
router.get("/search/:field/:search", contactController.findAllSearch);

// Create a new contact
router.post('/', contactController.create);

// Retrieve a single contact with id
router.get("/:id", contactController.findById);

// Update a contact with id
router.put('/:id', contactController.update);

// Delete a contact with id
router.delete("/:id", contactController.delete);

module.exports = router;