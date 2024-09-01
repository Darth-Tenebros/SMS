const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');
const teacherController = require('../controller/teacher.controller');

router.get("/students/", studentController.getAllStudents);

router.post("/students/", studentController.createStudent);

router.put("/students/:id", studentController.updateStudent);

router.get("/teachers/", teacherController.getAllTeachers);

router.post("/teachers/", teacherController.createTeacher);

router.put("/teachers/:id", teacherController.updateTeacher);

module.exports = router;