const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

// Create entry
router.post("/create", StudentController.createStudent);

// Read entry
router.get("/read", StudentController.readStudents);

// Update entry
router.post("/update", StudentController.updateStudent);

// Delete entry
router.get("/delete", StudentController.deleteStudent);

module.exports = router;
