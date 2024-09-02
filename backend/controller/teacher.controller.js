
const repository = require('../database/teacher.database');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth/auth.utils')

exports.getAllTeachers = (req, res) => {
    repository.getAllTeachers()
    .then((result) => {
        res.status(200).json({ data: result });
    })
    .catch((error) => {
        res.status(500).json({
            message: "get all teachers failed",
            data: error
        });
    });
}

exports.getTeacherByEmail = (req, res) => {
    const {email} = req.body;

    if(!email){
        res.status(400)
        .send({
            message: "you need to provide the email",
        })
    }

    repository.getTeacherByEmail(email)
    .then((result) => {
        res.status(200)
        .json({
            data: result
        })
    })
    .catch((error) => {
        res.status(500)
        .json({
            message: "failed to gte teacher by email",
            data: error
        })
    });
}

exports.createTeacher = (req, res) => {
    const {name, contact, homeRoom} = req.body;

    if(!name || !contact.email || !contact.phone || !homeRoom){
        res.status(400).send({ message: "all fields need to be filled" });
    }

    repository.createTeacher(req.body)
    .then((result) => {
        res.status(201).json({ data: result });
    })
    .catch((error) => {
        res.status(500).json({
            message: "create teacher failed",
            data: error
        });
    });
}

exports.updateTeacher = (req, res) => {
    const {id} = req.params;
    const updatedData = req.body;

    if(!id){
        res.status(400).send({ message: "you need to provide the id of the record you want to update" });
    }

    repository.updateTeacher(id, updatedData)
    .then((result) => {
        res.status(200).json({ data: result });
    })
    .catch((error) => {
        res.status(500).json({
            message: "failed to update teacher",
            data: error
        });
    });
}

exports.deleteTeacherById = (req, res) => {
    const {id} = req.params;

    if(!id){
        res.status(400)
        .send({
            message: "you need ot provide the id"
        });
    }

    repository.deleteTeacherById(id)
    .then((result) => {
        res.status(200)
        .json({
            data: result
        })
    })
    .catch((error) => {
        res.status(500)
        .json({
            message: "failed to delete teacher",
            data: error
        })
    });
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || ! password){
        res.status(400).send({
            message: "you need to provide all details"
        })
    }

    let teacher = await repository.getTeacherByEmail(email);
    teacher = teacher._doc;
    if(!teacher){
        res.status(404).send({
            message: `no teacher with email ${email} has been found`
        })
    }

    
    const isValid = bcrypt.compare(password, teacher.password);
    if(!isValid){
        res.status(401)
        .send({
            message: "invalid credentials"
        })
    }

    const token = auth.generateJWTToken(teacher);
    res.status(200)
    .json({
        data: token
    })
    
}