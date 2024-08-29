const model = require('../models/sms.models');

const seed = async () => {
    const homeRooms = await model.HomeRoomModel.insertMany([
        { name: 'Grade 9A' },
        { name: 'Grade 10B' },
        { name: 'Grade 11C' },
    ]);
    
    await model.TeacherModel.insertMany([
        { name: 'Mr. Smith', contact: { email: 'smith@example.com', phone: '555-1234' }, homeRoom: homeRooms[0]._id },
        { name: 'Ms. Johnson', contact: { email: 'johnson@example.com', phone: '555-5678' }, homeRoom: homeRooms[1]._id },
        { name: 'Mrs. Williams', contact: { email: 'williams@example.com', phone: '555-8765' }, homeRoom: homeRooms[2]._id },
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

seed();