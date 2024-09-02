
const model = require('../models/sms.models');

exports.getAllHomeRooms = () => {
    return model.HomeRoomModel.find({});
}

exports.getHomeRoomById = (id) => {
    return model.HomeRoomModel.find({_id: id});
}

exports.createHomeRoom = (homeRoom) => {
    return model.HomeRoomModel({
        name: homeRoom.name,
        teacher: homeRoom.teacher
    }).save();
}

exports.updateHomeRoom = (id, updatedData) => {
    return model.HomeRoomModel.updateOne(
        {_id: id},
        {$set: updatedData}
    );
}

exports.deleteHomeRoomById = (id) => {
    return model.HomeRoomModel.deleteOne(
        {_id : id}
    );
}