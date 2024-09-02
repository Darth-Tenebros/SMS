const model = require('../models/sms.models');
const hash = require('../middleware/auth/auth.utils')

const seed = async () => {
    const homeRooms = await model.HomeRoomModel.insertMany([
        { name: 'Grade 9A' },
        { name: 'Grade 10B' },
        { name: 'Grade 11C' },
    ]);
    
    await model.TeacherModel.insertMany([
        {
            name: 'Mr. Smith',
            password: hash.hashPassword('password'),
            contact: { email: 'smith@example.com', phone: '555-1234' },
            homeRoom: homeRooms[0]._id
        },
        {
            name: 'Ms. Johnson',
            password: hash.hashPassword('password1'),
            contact: { email: 'johnson@example.com', phone: '555-5678' },
            homeRoom: homeRooms[1]._id
        },
        {
            name: 'Mrs. Williams',
            password: hash.hashPassword('password2'),
            contact: { email: 'williams@example.com', phone: '555-8765' },
            homeRoom: homeRooms[2]._id
        },
    ]);

    await model.StudentModel.insertMany([
        {
            name: 'Alice Brown',
            contact: { email: 'alice.brown@example.com', phone: '555-1111' },
            subjects: [
                { name: 'Mathematics', mark: 85 },
                { name: 'Science', mark: 90 }
            ],
            homeRoom: homeRooms[0]._id
        },
        {
            name: 'Bob Green',
            contact: { email: 'bob.green@example.com', phone: '555-2222' },
            subjects: [
                { name: 'English', mark: 75 },
                { name: 'History', mark: 80 }
            ],
            homeRoom: homeRooms[1]._id
        },
        {
            name: 'Charlie Davis',
            contact: { email: 'charlie.davis@example.com', phone: '555-3333' },
            subjects: [
                { name: 'Biology', mark: 88 },
                { name: 'Chemistry', mark: 92 }
            ],
            homeRoom: homeRooms[2]._id
        },
    ]);

}

exports.getAllStudents = () => {
    return model.StudentModel.find({});
}

exports.getById = (id) => {
    return model.StudentModel.find({_id: id});
}

exports.createStudent = async (student) => {
    const homeRoom = await model.HomeRoomModel.find({name: student.homeRoom}) //middleware
    
    return model.StudentModel({
        name: student.name,
        contact: {
            email: student.contact.email,
            phone: student.contact.phone
        },
        subjects: [...student.subjects],
        homeRoom: homeRoom[0]._id
    }).save()
}

exports.updateStudent = (id, updatedData) => {
    return model.StudentModel.updateOne(
        {_id: id},
        {$set: updatedData}
    );
}

exports.deleteStudentById = (id) => {
    return model.StudentModel.deleteOne(
        {_id: id}
    )
}