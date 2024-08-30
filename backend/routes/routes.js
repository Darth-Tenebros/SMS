const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');

router.get("/students/", studentController.getAllStudents);

router.post("/students/", studentController.createStudent);

router.put("/students/:id", studentController.updateStudent);

module.exports = router;