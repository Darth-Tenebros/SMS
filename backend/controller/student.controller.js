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