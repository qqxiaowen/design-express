const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const course = new Schema({
    course_name: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'subject'
    },
    time_site: [
        {
            day: Number,
            node: Number,
            classroom: String
        }
    ],
    grade: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'grade'
    },
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'teacher'
    }
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('course', course);