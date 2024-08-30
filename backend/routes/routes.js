const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');

router.get("/students/", studentController.getAllStudents);

module.exports = router;