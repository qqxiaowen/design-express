const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const location = new Schema({
    teacherLocation: Array,
    clockId: String,
    grade: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'grade'
    },
    teacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'teacher'
    }
},{versionKey: false, timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}})

module.exports = mongoose.model('location', location);