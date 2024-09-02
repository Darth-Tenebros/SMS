const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');
const teacherController = require('../controller/teacher.controller');
const homeRoomController = require('../controller/homeRoom.controller');

router.get("/students/", studentController.getAllStudents);

router.post("/students/", studentController.createStudent);

router.put("/students/:id", studentController.updateStudent);

router.delete("/students/:id", studentController.deleteStudentById);
router.get("/teachers/", teacherController.getAllTeachers);

router.post("/teachers/", teacherController.createTeacher);

router.put("/teachers/:id", teacherController.updateTeacher);

router.get("/homerooms/", homeRoomController.getAllHomeRooms);

router.post("/homerooms/", homeRoomController.createHomeRoom);

router.put("/homerooms/:id", homeRoomController.updateHomeRoom);


module.exports = router;