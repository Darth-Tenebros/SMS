const model = require('../models/sms.models');
const hash = require('../middleware/auth/auth.utils')

const seed = async () => {
    // Define real names for teachers
    const teacherNames = [
        'Mr. Jameson', 'Ms. Bennett', 'Mrs. Lee', 'Mr. Patel', 'Ms. Garcia'
    ];

    // Define real names for students
    const studentNames = [
        'Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Edward Wright',
        'Fiona Davis', 'George Clark', 'Hannah Lewis', 'Ian Walker', 'Julia Harris',
        'Kevin Robinson', 'Laura Martinez', 'Michael Thompson', 'Nina King', 'Oliver Scott',
        'Paula Adams', 'Quincy Nelson', 'Rachel King', 'Samuel Evans', 'Tina Young'
    ];

    // Generate 5 home rooms (classes)
    const homeRooms = await model.HomeRoomModel.insertMany([
        { name: 'Grade 12A' },
        { name: 'Grade 12B' },
        { name: 'Grade 12C' },
        { name: 'Grade 12D' },
        { name: 'Grade 12E' },
    ]);

    // Generate teachers for each home room
    const teachers = await model.TeacherModel.insertMany(
        homeRooms.map((homeRoom, index) => ({
            name: teacherNames[index],
            password: hash.hashPassword('password' + index),
            contact: { email: `teacher${index + 1}@example.com`, phone: `555-1${index + 1}34` },
            homeRoom: homeRoom._id
        }))
    );

    // Generate 20 students for each home room
    const students = [];
    for (const homeRoom of homeRooms) {
        for (let i = 0; i < 20; i++) {
            students.push({
                name: studentNames[i],
                password: hash.hashPassword('student' + (i + 1)),
                contact: { email: `student${i + 1}@example.com`, phone: `555-1${i + 1}56` },
                subjects: [
                    { name: 'Mathematics', mark: Math.floor(Math.random() * 100) },
                    { name: 'Science', mark: Math.floor(Math.random() * 100) }
                ],
                homeRoom: homeRoom._id
            });
        }
    }

    await model.StudentModel.insertMany(students);

}
seed();

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

exports.getStudentByEmail = (email) => {
    return model.StudentModel.findOne(
        {"contact.email": email}
    )
}