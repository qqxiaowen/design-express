const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clock = new Schema({
    clockName: String,
    content: [
        {
            student: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'student'
            },
            status: Number
        }
    ],
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'teacher'
    },
    grade: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'grade'
    },
    course: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'course'
    }
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('clock', clock);