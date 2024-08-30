const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGO_DB_CONNSTR)
mongoose.connect(process.env.MONGO_DB_CONNSTR, {
    dbName: "student-management"
});

const subjectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    mark: {type: Number, required: true},
});

const homeRoomSchema = new mongoose.Schema({
    //e.g: grade 9A
    name: {type: String, required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Teacher'},
});
const HomeRoomModel = mongoose.model('HomeRoom', homeRoomSchema);

const studentSchema = new mongoose.Schema({
    name: {type: String, required: true},
    contact: {
        email: {type: String, required: true},
        phone: {type: String, required: true}
    },
    subjects: {type: [subjectSchema], required: true},
    homeRoom: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'HomeRoom'}
});
const StudentModel = mongoose.model('Student', studentSchema);

const teacherSchema = new mongoose.Schema({
    name: {type: String, required: true},
    contact: {
        email: {type: String, required: true},
        phone: {type: String, required: true}
    },
    homeRoom: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'HomeRoom'}
});
const TeacherModel = mongoose.model('Teacher', teacherSchema);


exports.HomeRoomModel = HomeRoomModel;
exports.StudentModel = StudentModel;
exports.TeacherModel = TeacherModel;