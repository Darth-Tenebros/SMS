
const repository = require('../database/teacher.database');

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

exports.createTeacher = (req, res) => {
    const {name, contact, homeRoom} = req.body;

    if(!name || !contact.email || !contact.phone || !homeRoom){
        return res.status(400).send({ message: "all fields need to be filled" });
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
        return res.status(400).send({ message: "you need to provide the id of the record you want to update" });
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
