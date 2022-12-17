const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Retrieve all users
router.get("/", userController.findAll);

// Retrieve users, sorted
router.get("/orderby/:orderby", userController.findAllSorted);

// Retrieve users with a limit
router.get("/limit/:limit", userController.findAllLimit);

// Retrieve users with a limit and offsset
router.get("/limit/:limit/:offset", userController.findAllLimitOffset);

// Retrieve users with a searchterm on a specific field
router.get("/search/:field/:search", userController.findAllSearch);

// Create a new user
router.post('/', userController.create);

// Retrieve a single user with id
router.get("/:id", userController.findById);

// Update a user with id
router.put('/:id', userController.update);

// Delete a user with id
router.delete("/:id", userController.delete);

module.exports = router;
