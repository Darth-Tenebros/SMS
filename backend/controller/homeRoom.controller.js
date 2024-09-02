
const repository = require('../database/homeRoom.database');

exports.getAllHomeRooms = (req, res) => {
    repository.getAllHomeRooms()
    .then((result) => {
        res.status(200).json({ data: result });
    })
    .catch((error) => {
        res.status(500).json({
            message: "get all homerooms failed",
            data: error
        });
    });
}

exports.createHomeRoom = (req, res) => {
    const {name, teacher} = req.body;

    if(!name || !teacher){
        res.status(400).send({ message: "all fields need to be filled" });
    }

    repository.createHomeRoom(req.body)
    .then((result) => {
        res.status(201).json({ data: result });
    })
    .catch((error) => {
        res.status(500).json({
            message: "create homeroom failed",
            data: error
        });
    });
}

exports.updateHomeRoom = (req, res) => {
    const {id} = req.params;
    const updatedData = req.body;

    if(!id){
        res.status(400).send({ message: "you need to provide the id of the record you want to update" });
    }

    repository.updateHomeRoom(id, updatedData)
    .then((result) => {
        res.status(200).json({ data: result });
    })
    .catch((error) => {
        res.status(500).json({
            message: "failed to update homeroom",
            data: error
        });
    });
}

exports.deleteHomeRoomById = (req, res) => {
    const {id} = req.params;

    if(!id){
        res.status(400).send({
            message: "you must provide the id"
        })
    }

    repository.deleteHomeRoomById(id)
    .then((result) => {
        res.status(200)
        .json({
            data: result
        })
    })
    .catch((error) => {
        res.status(500)
        .json({
            message: "failed to delete home room",
            data: error
        })
    });
}