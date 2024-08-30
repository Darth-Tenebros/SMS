const repository = require('../database/student.database');

exports.getAllStudents = (req, res) => {
    repository.getAllStudents()
    .then((result) => {
        res.status(200)
        .json({
            data: result
        })
        
    })
    .catch((error) => {
        res.status(500)
        .json({
            message: "get all failed",
            data: error
        })
    });
}

exports.createStudent = (req, res) => {
    const {name, contact, subjects, homeRoom} = req.body;
    
    if(!name || !contact.email || !contact.phone || !subjects.length > 0 || !homeRoom){
        res.status(400)
        .send({
            message: "all fields need to be filled"
        })
    }

    repository.createStudent(req.body)
    .then((result) => {
        res.status(201)
        .json({
            data: result,
        })
    })
    .catch((error) => {
        res.status(500)
        .json({
            message: "create student failed",
            data: error
        })
    });
}