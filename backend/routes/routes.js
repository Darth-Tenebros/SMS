const express = require('express');
const router = express.Router();
const studentController = require('../controller/student.controller');
const teacherController = require('../controller/teacher.controller');
const homeRoomController = require('../controller/homeRoom.controller');
const {login, verifyTokenMiddleWare, authorizeRolesMiddleware} = require('../middleware/auth/auth.utils');

// student
router.get("/students/", verifyTokenMiddleWare, authorizeRolesMiddleware(['teacher', 'student']), studentController.getAllStudents);

router.post("/students/", verifyTokenMiddleWare, authorizeRolesMiddleware(['teacher']), studentController.createStudent);

router.put("/students/:id", verifyTokenMiddleWare, authorizeRolesMiddleware(['teacher']), studentController.updateStudent);

router.delete("/students/:id", verifyTokenMiddleWare, authorizeRolesMiddleware(['teacher']), studentController.deleteStudentById);

// teacher
router.get("/teachers/", verifyTokenMiddleWare, authorizeRolesMiddleware(['teacher']), teacherController.getAllTeachers);

router.post("/teachers/", verifyTokenMiddleWare, authorizeRolesMiddleware(['teacher']), teacherController.createTeacher);

router.put("/teachers/:id", verifyTokenMiddleWare, authorizeRolesMiddleware(['teacher']), teacherController.updateTeacher);


// authenticate
router.post("/login/", login);

// homeroom
router.get("/homerooms/", verifyTokenMiddleWare, authorizeRolesMiddleware(['teacher', 'student']), homeRoomController.getAllHomeRooms);

router.post("/homerooms/", verifyTokenMiddleWare, authorizeRolesMiddleware(['teacher']), homeRoomController.createHomeRoom);

router.put("/homerooms/:id", verifyTokenMiddleWare, authorizeRolesMiddleware(['teacher']), homeRoomController.updateHomeRoom);


module.exports = router;