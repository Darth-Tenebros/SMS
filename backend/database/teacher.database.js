
const model = require('../models/sms.models');

exports.getAllTeachers = () => {
    return model.TeacherModel.find({});
}

exports.getTeacherById = (id) => {
    return model.TeacherModel.find({_id: id});
}

exports.createTeacher = async (teacher) => {
    const homeRoom = await model.HomeRoomModel.find({name: teacher.homeRoom}) // middleware
    
    return model.TeacherModel({
        name: teacher.name,
        contact: {
            email: teacher.contact.email,
            phone: teacher.contact.phone
        },
        homeRoom: homeRoom[0]._id
    }).save();
}

exports.updateTeacher = (id, updatedData) => {
    return model.TeacherModel.updateOne(
        {_id: id},
        {$set: updatedData}
    );
}
